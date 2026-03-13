# 用户模块 Controller & Resposity 文档

> 文件路径：`src/apps/user/user_controller.ts` | `src/apps/user/user_resposity.ts`

## 目录

| 函数名 | 简介 |
|--------|------|
| [userRegisterController](#userregistercontroller) | 用户名+密码注册，支持邀请码核销 |
| [usernameCheckRepeatController](#usernamecheckrepeatcontroller) | 检查用户名是否已存在（支持缓存） |
| [emailCheckRepeatController](#emailcheckrepeatcontroller) | 检查邮箱是否已注册（支持缓存） |
| [getUserByIDController](#getuserbyidcontroller) | 通过 ID 查询用户，支持字段过滤和缓存 |
| [registerUserByEmailWithVerifyController](#registeruserbyemailwithverifycontroller) | 邮箱注册完整流程（含验证、查重、邀请码） |
| [registerUserByEmailController](#registeruserbyemailcontroller) | 低层邮箱用户插入，不含业务校验 |
| [getUserByUsernameController](#getuserbyusernamecontroller) | 通过用户名查询用户（用于登录校验） |
| [addUserCreditController](#addusercreditcontroller) | 给用户累加免费或付费积分 |
| [updatePasswordController](#updatepasswordcontroller) | 更新用户密码（自动哈希） |
| [extendUserVipController](#extenduservezipcontroller) | 延长用户 VIP 到期时间 |
| [applyInviteCodeController](#applyinvitecodecontroller) | 已登录用户用邀请码激活账号 |bulkInsertInviteCodes
| [getUserByIdResposity](#getuserbyidrsposity) | 通过 ID 查询用户（纯数据库，无缓存） |
| [updateUserRoleResposity](#updateuserroleresposity) | 更新用户角色 |

---

## Controller

### userRegisterController
:::success[tips]
用户注册控制器，使用用户名 + 密码方式注册。内部开启数据库事务，支持注册时同步核销邀请码并升级用户角色。
:::

**参数**
- `username` : `string` — 用户名
- `hashedPassword` : `string` — 已哈希的密码
- `invite_code` : `string | null` — 邀请码（可选）

**返回** `APIResponse` — 成功时含 `{ user_id }` ，失败时含对应错误信息

---

### usernameCheckRepeatController
:::success[tips]
检查用户名是否已存在，支持 Redis 缓存层加速查询。
:::

**参数**
- `username` : `string` — 待检查的用户名
- `tx` : `tx_type` — 数据库事务/连接
- `cache_layer` : `boolean` — 是否启用 Redis 缓存层（默认 `false`）

**返回** `[userId | null, "cache" | "db"]`



### emailCheckRepeatController
:::success[tips]
检查邮箱是否已被注册，支持 Redis 缓存层。用于区分登录/注册流程。
:::

**参数**
- `email` : `string` — 待检查的邮箱地址
- `tx` : `tx_type` — 数据库事务/连接
- `cache_layer` : `boolean` — 是否启用 Redis 缓存层（默认 `false`）

**返回** `[userId | null, "cache" | "db"]`






### getUserByIDController
:::success[tips]
通过用户 ID 查询用户信息，支持字段过滤和 Redis 缓存层。
:::

**参数**
- `uid` : `number` — 用户 ID
- `filter` : `Record<string, any> | null` — 字段过滤器，传 `null` 则查询全部字段
- `cache_layer` : `boolean` — 是否启用缓存（默认 `false`）
- `tx` : `tx_type | null` — 数据库事务（可选）

**返回** `[Partial<UserRow> | null, "cache" | "db"]`

---

### registerUserByEmailWithVerifyController
:::success[tips]
邮箱注册完整流程控制器。在事务内完成邮箱查重、用户名查重、邀请码核销、用户创建等操作。
:::

**参数**
- `email` : `string` — 注册邮箱
- `verify_content` : `string` — Redis 中存储的验证码内容（JSON 字符串）
- `username` : `string` — 用户名
- `invite_code` : `string | null` — 邀请码（可选）

**返回** `APIResponse` — 成功时含 `{ user: [...] }`

---

### registerUserByEmailController
:::success[tips]
直接向数据库插入邮箱用户，不含验证逻辑。是低层操作，通常由上层控制器调用。
:::

**参数**
- `email` : `string` — 邮箱地址
- `username` : `string` — 用户名
- `db` : `tx_type` — 数据库连接

**返回** 新用户的 `id` 列表

---

### getUserByUsernameController
:::success[tips]
通过用户名查询完整用户列表，用于登录密码校验等场景。
:::

**参数**
- `username` : `string` — 用户名
- `tx` : `tx_type | null` — 数据库连接（为 null 时使用全局 db）

**返回** 用户数组

---

### addUserCreditController
:::success[tips]
给指定用户累加积分（免费积分或付费积分），直接更新数据库。
:::

**参数**
- `user` : `InferSelectModel<typeof user_model>` — 用户对象
- `credit` : `number` — 增加的积分数量
- `credit_type` : `"free" | "pay"` — 积分类型
- `tx` : `tx_type | null` — 数据库事务（可选）

---

### updatePasswordController
:::success[tips]
更新用户密码。函数内部自动使用 Bun 对新密码进行哈希后再写入数据库。
:::

**参数**
- `user_id` : `number` — 用户 ID
- `new_password` : `string` — 新密码（明文，函数内部自动哈希）
- `tx` : `tx_type | null` — 数据库事务（可选）

**返回** `true`

---

### extendUserVipController
:::success[tips]
延长用户 VIP 到期时间。若当前 VIP 已过期，则从当前时间起开始累加天数。
:::

**参数**
- `user` : `InferSelectModel<typeof user_model>` — 用户对象
- `days` : `number` — 延长的天数
- `tx` : `tx_type | null` — 数据库事务（可选）

**返回** 更新后的用户对象

---

### applyInviteCodeController
:::success[tips]
已登录用户使用邀请码激活账号。仅 `Guest` 角色可调用，成功后角色升级为 `Default`，邀请码同时被标记为已使用。
:::

**参数**
- `userId` : `number` — 当前登录用户的 ID
- `inviteCode` : `string` — 用户输入的邀请码

**返回** `APIResponse` — 成功时含 `{ role: "Default" }`

---

## Resposity

### getUserByIdResposity
:::success[tips]
通过用户 ID 从数据库查询完整用户信息（无缓存层的纯数据库操作）。
:::

**参数**
- `id` : `number` — 用户 ID
- `tx` : `tx_type` — 数据库连接（可选，默认使用全局 db）

**返回** `UserRow | null`

---

### updateUserRoleResposity
:::success[tips]
更新用户角色，直接操作数据库，通常在事务内调用。
:::

**参数**
- `userId` : `number` — 用户 ID
- `role` : `UserRole` — 新角色（`Guest` / `Default` / `Admin`）
- `tx` : `tx_type` — 数据库连接（可选，默认使用全局 db）

---

## Domain — 圈子权限系统

> 文件路径：`src/apps/user/user_domains/user_auth_domain.ts` | `src/apps/user/user_domains/user_auth_handler_domain.ts`

### 目录

| 导出名 | 类型 | 简介 |
|--------|------|------|
| [CommAllPermissions](#commallpermissions) | `enum` | 所有圈子权限枚举值 |
| [CommManagerLayer](#commmanagerlayer) | `enum` | 管理层级枚举（权限分层判定） |
| [LayerHandler](#layerhandler) | `class` | 管理层级权限比较工具类 |
| ~~[PayColumnArgs](#paycolumnargs)~~ | `interface` | ~~付费专栏/消息的限制参数~~ **`已弃用`** |
| ~~[KickbackArgs](#kickbackargs)~~ | `interface` | ~~积分抽成活动的比例配置~~ **`已弃用`** |
| [roleBasic](#rolebasic) | `class` | 权限基类，可序列化/反序列化 |
| [roleGuestPermissionGroup](#roleguestpermissiongroup) | `class` | 来宾权限组 |
| [roleFansPermissionGroup](#rolefanspermissiongroup) | `class` | 普通粉丝权限组 |
| [roleCollectFansPermissionGroup](#rolecollectfanspermissiongroup) | `class` | 特别关注用户权限组 |
| [rolePayFansPermissionGroup](#rolepayfanspermissiongroup) | `class` | 付费用户权限组 |
| [roleSubManagerPermissionGroup](#rolesubmanagerpermissiongroup) | `class` | 管理员权限组 |
| [roleMasterManagerPermissionGroup](#rolemastermanagerpermissiongroup) | `class` | 圈主权限组 |
| [commRoleTable](#commroletable) | `const` | CommRole → 权限组 映射表 |
| [validate_manager_auth](#validate_manager_auth) | `function` | 验证用户是否拥有指定权限 |
| [can_grant_permission](#can_grant_permission) | `function` | 验证用户是否可向下层授予权限 |
| [full_entry / \_\_lock\_instance](#full_entry--__lock_instance) | `type` | SSOT 互斥锁定标记（`WIP`） |
| [sharedRoleGroup](#sharedrolegroup) | `interface` | 角色分组泛型基础类型 |
| [CreatePayMessageArgs](#createpaymessageargs) | `type` | 创建付费消息的各角色积分配置 |
| [CreateFreeColumnArgs](#createfreecolumnargs) | `type` | 创建免费专栏的各角色限制配置 |
| [setPayUserMinValueArgs](#setpayuserminvalueargs) | `type` | 付费用户判断阈值配置 |
| [innerDefaultArgs](#innerdefaultargs) | `const` | 单层级权限参数默认值 |
| [defaultArgs](#defaultargs) | `const` | 按管理层级组织的权限参数默认值总表 |

---

### CommAllPermissions

所有圈子操作权限的枚举，分为四个层级：

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `FreeView` | 0 | 免费阅览 |
| `FreeFollow` | 1 | 免费关注 |
| `BadReportColumn` | 2 | 举报圈子（**不可被剥夺**） |
| `ManagerSelfColumn` | 3 | 管理自己的资源（专栏/消息） |
| `CreateFreeMessage` | 4 | 创建免费消息 |
| `CreateFreeColumn` | 5 | 创建免费专栏 |
| `CreatePayMessage` | 6 | 创建付费消息 |
| `CreatePayColumn` | 7 | 创建付费专栏 |
| `SetSelfColumnIndex` | 8 | 设置自己专栏的优先级 |
| `ManagerPermission` | 9 | 管理员身份标志位 |
| `DeleteMessage` | 10 | 删除消息 |
| `HandlerReport` | 11 | 处理举报信息 |
| `SetAllowCreateFreeColumn` | 12 | 控制是否允许创建免费专栏 |
| `SetAllowCreatePayColumn` | 13 | 控制是否允许创建付费专栏 |
| `SetAllowCreateFreeMessage` | 14 | 控制是否允许创建免费消息 |
| `SetAllowCreatePayMessage` | 15 | 控制是否允许创建付费消息 |
| `SetGuestFreeView` | 16 | 设置来宾用户是否可以免费访问 |
| `SetGuestFreeFollow` | 17 | 设置来宾用户是否可以免费关注 |
| `SetPayUserMinValue` | 18 | 设置付费用户判断阈值 |
| `CheckCommCredit` | 19 | 查看积分库 |
| `SetManagerPermission` | 20 | 设置管理员权限 |
| `TransferMaster` | 21 | 转移圈主 |
| `ManageCommCredit` | 22 | 管理/分红圈内积分库 |
| `CreditCommDividend` | 23 | 积分抽成分红 |
| `SetDiscountCommActive` | 24 | 全场积分打折活动 |
| `SetKickbackPayValue` | 25 | 收费资源积分抽成设置 |
| `ApplyAdminHelp` | 26 | 申请果果代管 |
| `ModComm` | 27 | 修改圈子信息 |
| `RemoveComm` | 28 | 删除圈子 |
| `CommLevelManage` | 29 | 圈子等级管理（充值） |
| `ManageCloudFile` | 30 | 云盘文件管理 |

---

### CommManagerLayer

:::info
管理层级枚举，用于定义不同管理角色的权限层级。`LayerHandler.grantPermission` 通过比较层级数值来判断权限高低。
:::

> 文件路径：`src/apps/user/user_domains/shared/Role.ts`

```typescript
enum CommManagerLayer {
  UnManager = 0,     // 非管理
  SubManager = 4,    // 底层管理（仅对 4 级以下有效）
  MasterManger = 6,  // 圈主管理（对 6 级以下有效）
  Admin = 100        // 最高 Admin
}
```

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `UnManager` | 0 | 非管理身份，无管理权限 |
| `SubManager` | 4 | 底层管理员，仅可管理 4 级以下的操作 |
| `MasterManger` | 6 | 圈主管理，对 6 级以下的操作均有效 |
| `Admin` | 100 | 最高管理员，拥有所有管理权限 |

---

### LayerHandler

:::success[tips]
管理层级权限比较工具类，提供静态方法用于判断一个管理层级是否有权操作另一个管理层级。
:::

> 文件路径：`src/apps/user/user_domains/shared/Role.ts`

**方法**

#### `static grantPermission(leftValue, rightValue)`

判断 `leftValue` 层级是否有权限操作 `rightValue` 层级。判断逻辑为 `leftValue >= rightValue`，即层级数值大于或等于目标层级时，视为拥有权限。

- `leftValue` : `CommManagerLayer` — 当前用户的管理层级
- `rightValue` : `CommManagerLayer` — 目标操作所需的管理层级

**返回** `boolean` — `true` 表示有权限

**示例**

```typescript
// 圈主（6）可以操作底层管理（4）的功能
LayerHandler.grantPermission(CommManagerLayer.MasterManger, CommManagerLayer.SubManager) // true

// 底层管理（4）无法操作圈主级别（6）的功能
LayerHandler.grantPermission(CommManagerLayer.SubManager, CommManagerLayer.MasterManger) // false
```

---

### PayColumnArgs

:::caution[已弃用]
该接口已从代码中移除，此处仅保留文档记录供历史参考。请勿在新代码中使用。
:::

~~付费专栏/消息创建限制参数接口。~~

| 字段 | 类型 | 说明 |
|------|------|------|
| ~~`createPayColumnCost`~~ | `number` | 创建付费专栏所需积分（0 表示免费） |
| ~~`payColumnCountedInFreeQuota`~~ | `boolean` | 付费创建的专栏是否占用免费专栏名额 |
| ~~`freePayColumnMaxCount`~~ | `number` | 单用户可免费创建的最大付费专栏数 |
| ~~`freePayMessageMaxCount`~~ | `number` | 单用户可免费创建的最大付费消息数 |

---

### KickbackArgs

:::caution[已弃用]
该接口已从代码中移除，此处仅保留文档记录供历史参考。请勿在新代码中使用。
:::

~~积分抽成活动的比例配置接口（所有比例范围 0～1）。~~

| 字段 | 说明 |
|------|------|
| ~~`subManagerRate`~~ | 管理员抽成比例（默认 `0.05`） |
| ~~`payFansRate`~~ | 付费用户抽成比例（默认 `0.03`） |
| ~~`collectFansRate`~~ | 特关用户抽成比例（默认 `0.02`） |
| ~~`defaultFansRate`~~ | 普通粉丝抽成比例（默认 `0.01`） |
| ~~`guestRate`~~ | 来宾用户抽成比例（默认 `0`） |

---

### roleBasic

所有权限组的基类。

**属性**

| 属性 | 类型 | 说明 |
|------|------|------|
| `default_permission` | `CommAllPermissions[]` | 当前角色生效的权限列表 |
| `filter` | `CommAllPermissions[]` | 上级屏蔽的权限（过滤列表） |
| `can_set_permission` | `CommAllPermissions[]` | 该角色可向下层授予/撤销的权限 |
| `permission_args` | `Partial<Record<CommAllPermissions, any>>` | 各权限对应的附加参数 |

**方法**

- `removePermission()` — 从 `default_permission` 中移除 `filter` 中的所有权限（应用上级约制）
- `serializer()` — 将当前权限状态序列化为可存入 DB 的对象
- `load(data)` — 从 DB 反序列化，恢复权限状态

---

### roleGuestPermissionGroup

:::info
来宾用户权限组（`CommRole.Guest`）。`FreeView` / `FreeFollow` 默认关闭，需管理员开启后才会追加。`BadReportColumn` 举报权限**不可被剥夺**。
:::

**默认权限**：`BadReportColumn`

---

### roleFansPermissionGroup

:::info
普通粉丝权限组（`CommRole.DefaultFans`）。在来宾基础上追加基本浏览/关注以及免费内容创建权限。
:::

**默认权限**：`BadReportColumn` · `FreeFollow` · `FreeView` · `ManagerSelfColumn` · `CreateFreeMessage` · `CreateFreeColumn`

---

### roleCollectFansPermissionGroup

:::info
特别关注用户权限组（`CommRole.CollectFans`）。在普通粉丝基础上追加设置自己专栏优先级的权限。
:::

**默认权限**：继承粉丝 + `SetSelfColumnIndex`

---

### rolePayFansPermissionGroup

:::info
付费用户权限组（`CommRole.PayFans`）。在特关基础上追加付费专栏/消息创建权限，实际限额由管理员层约制。
:::

**默认权限**：继承特关 + `CreatePayMessage` · `CreatePayColumn`

**默认参数**

| 权限 | 参数 | 默认值 |
|------|------|--------|
| `CreatePayColumn` | `freePayColumnMaxCount` | `1` |
| `CreatePayMessage` | `freePayMessageMaxCount` | `5` |

---

### roleSubManagerPermissionGroup

:::warning
管理员权限组（`CommRole.SubManager`）。拥有 `ManagerPermission` 标志，大多数管理权受圈主约制。**不得将管理权授予更低层级用户。**
:::

**默认开启（受圈主约制）**：`ManagerPermission` · `DeleteMessage` · `HandlerReport` · `SetAllowCreateFreeColumn` · `SetAllowCreatePayColumn` · `SetAllowCreateFreeMessage` · `SetAllowCreatePayMessage`

**默认关闭（需圈主手动开启）**：`CheckCommCredit` · `SetPayUserMinValue` · `SetGuestFreeView` · `SetGuestFreeFollow`

**可向下授予**：`CreatePayColumn` · `CreatePayMessage` · `CreateFreeColumn` · `CreateFreeMessage` · `SetSelfColumnIndex` · `FreeView` · `FreeFollow`

---

### roleMasterManagerPermissionGroup

:::danger
圈主权限组（`CommRole.MasterManager`）。最高权限，`removePermission()` 为空实现，**不受任何上级约制**。
:::

**专属权限**：`SetManagerPermission` · `TransferMaster` · `ManageCommCredit` · `CreditCommDividend` · `SetDiscountCommActive` · `SetKickbackPayValue` · `ApplyAdminHelp` · `ModComm` · `RemoveComm` · `CommLevelManage` · `ManageCloudFile`

**默认积分抽成参数（`SetKickbackPayValue`）**

| 身份 | 比例 |
|------|------|
| 管理员 | 5% |
| 付费用户 | 3% |
| 特关用户 | 2% |
| 普通粉丝 | 1% |
| 来宾 | 0% |

---

### commRoleTable

`CommRole` 枚举到权限组类的映射表，同时记录了权重（用于跨角色权限比较）。

| CommRole | 权限组类 | weight |
|----------|----------|--------|
| `Guest` | `roleGuestPermissionGroup` | 1 |
| `DefaultFans` | `roleFansPermissionGroup` | 2 |
| `CollectFans` | `roleCollectFansPermissionGroup` | 3 |
| `PayFans` | `rolePayFansPermissionGroup` | 4 |
| `SubManager` | `roleSubManagerPermissionGroup` | 5 |
| `MasterManager` | `roleMasterManagerPermissionGroup` | 6 |

---

### validate_manager_auth

:::success[tips]
验证用户是否拥有指定权限。内部会先调用 `removePermission()` 应用上级过滤后再判断。
:::

**参数**
- `handler_user_role` : `roleBasic` — 当前用户的角色权限实例
- `need_permission` : `CommAllPermissions` — 需要验证的权限枚举值

**返回** `boolean` — 拥有该权限返回 `true`

---

### can_grant_permission

:::success[tips]
验证当前角色是否有权向下层授予指定权限，基于 `can_set_permission` 列表判断。
:::

**参数**
- `handler_user_role` : `roleBasic` — 当前用户的角色权限实例
- `target_permission` : `CommAllPermissions` — 目标权限枚举值

**返回** `boolean` — 可授予返回 `true`

---

## 参数类型定义

> 文件路径：`src/apps/user/user_domains/shared/RoleArgs.ts`
>
> 这些类型用于定义不同角色的权限参数结构，通过 `permission_args` 字段传入各权限组实例，控制各角色在特定操作上的具体行为限制。

:::warning[SSOT 唯一可靠来源]
为了区分参数中不同角色设置的权限参数, 采用SSOT进行区分, 通俗来说就是`4层权限`的管理和`6层权限`的圈主同时对一个参数进行了设置, 在实际判断的时候权限层数越高的参数会覆盖底层的, 也就是说 **当高层设置权限参数的时候会覆盖底层的, 底层设置参数的时候如果高层有值那么就无法进行设置.**
:::

### full_entry / \_\_lock\_instance

:::warning[WIP — 尚在完善中]
此概念用于标识 RoleArg 中的 **SSOT 整体互斥锁定** 机制。
:::

当 `RoleArgs` 中的参数字段对象包含 `__lock_instance: true` 时，表示该字段在 `RoleArgReader` 中的 SSOT 是**整体互斥的**：

- **存在 `__lock_instance`**：只要上级权限层存在**任意一个值不为 `null`**，则下面所有权限层级**均无权修改**。SSOT 以该上级字段值为正确输出。
- **不存在 `__lock_instance`**：当上层值为 `null` 时，会**冒泡到下层权限**，逐级检查直到找到不为 `null` 的值，然后交给 SSOT 返回。

```typescript
export type full_entry = {
    __lock_instance: true
}
```

**使用示例**（`setPayUserMinValueArgs` 类型中使用了 `full_entry`）：

```typescript
export type setPayUserMinValueArgs = full_entry & {
    min_cost_pay: number | null,
    min_cost_free: number | null,
    min_policy: "cost" | "free" | "both" | null,
}
```

> 当 `setPayUserMinValueArgs` 被设置后，因为带有 `__lock_instance: true`，上级圈主的值一旦存在，子管理员将无法覆盖该阈值配置。

---

### sharedRoleGroup

角色分组泛型基础接口，为每种身份定义独立的参数值。所有权限参数类型均基于此结构扩展。

```typescript
interface sharedRoleGroup<T = number> {
  RoleGroup: {
    guest_value: T,       // 来宾
    fan_value: T,         // 普通粉丝
    collect_value: T,     // 特别关注用户
    pay_value: T,         // 付费用户
    subManager_value: T,  // 子管理员
    masterManager_value: T, // 圈主
  }
}
```

| 字段 | 对应身份 | 说明 |
|------|----------|------|
| `guest_value` | 来宾 | 未加入圈子的访客 |
| `fan_value` | 普通粉丝 | 已加入但未付费的用户 |
| `collect_value` | 特别关注 | 收藏了该圈子的用户 |
| `pay_value` | 付费用户 | 达到付费积分阈值的用户 |
| `subManager_value` | 子管理员 | 由圈主任命的管理员 |
| `masterManager_value` | 圈主 | 圈子创建者/所有者 |

---

### CreatePayMessageArgs

:::success[tips]
创建付费消息时，各角色在不同消费场景下的积分配置。泛型参数 `T` 为一个包含四个维度的对象。
:::

**类型定义**：`sharedRoleGroup<{ cost_create_pay, cost_create_free, no_cost_create_pay, no_cost_create_free }>`

| 泛型字段 | 类型 | 说明 |
|----------|------|------|
| `cost_create_pay` | `number` | 消耗积分创建**付费**消息所需积分 |
| `cost_create_free` | `number` | 消耗积分创建**免费**消息所需积分 |
| `no_cost_create_pay` | `number` | 免费额度内创建**付费**消息的上限 |
| `no_cost_create_free` | `number` | 免费额度内创建**免费**消息的上限 |

---

### CreateFreeColumnArgs

:::success[tips]
创建免费专栏时，各角色的开关与数量限制。
:::

**类型定义**：`sharedRoleGroup<{ flag, limit }>`

| 泛型字段 | 类型 | 说明 |
|----------|------|------|
| `flag` | `boolean` | 该角色是否被允许创建免费专栏 |
| `limit` | `number` | 可创建的免费专栏数量上限（`0` 表示无限制或禁止，取决于 `flag`） |

---

### setPayUserMinValueArgs

:::success[tips]
付费用户判断阈值配置。当用户的累计消费积分达到该阈值时，系统自动将其升级为付费用户身份。该类型继承了 `full_entry`，因此带有 `__lock_instance` 整体互斥锁定。
:::

**类型定义**：`full_entry & { min_cost_pay, min_cost_free, min_policy }`

| 字段 | 类型 | 说明 |
|------|------|------|
| `__lock_instance` | `true` | 继承自 `full_entry`，标识该参数 SSOT 整体互斥 |
| `min_cost_pay` | `number \| null` | 最低付费积分阈值 |
| `min_cost_free` | `number \| null` | 最低免费积分阈值 |
| `min_policy` | `"cost" \| "free" \| "both" \| null` | 判断策略：仅付费 / 仅免费 / 两者兼顾 |

---

### innerDefaultArgs

:::info
单层级权限参数的默认值集合。包含各权限 ID 对应的 `sharedRoleGroup` 实例，是 `defaultArgs` 的组成单元。
:::

```typescript
const innerDefaultArgs = {
  [CommAllPermissions.CreatePayMessage]: { ... } satisfies CreatePayMessageArgs,
  [CommAllPermissions.CreateFreeColumn]: { ... } satisfies CreateFreeColumnArgs,
}
```

**当前包含的权限默认参数：**

| 权限 Key | 类型约束 | 所有角色默认值 |
|----------|----------|----------------|
| `CreatePayMessage`（6） | `CreatePayMessageArgs` | 全部为 `null`（所有角色所有维度均为 `null`） |
| `CreateFreeColumn`（5） | `CreateFreeColumnArgs` | `flag: null`, `limit: null`（所有角色默认未设置） |
| `SetPayUserMinValue`（18） | `setPayUserMinValueArgs` | `min_cost_pay: 0`, `min_cost_free: 0`, `min_policy: "both"`, `__lock_instance: true` |

---

### defaultArgs

:::info
按 `CommManagerLayer` 管理层级组织的权限参数默认值总表。每个层级对应一份完整的 `innerDefaultArgs`，由圈主权限组的 `permission_args` 引用。
:::

```typescript
const defaultArgs: Partial<Record<CommManagerLayer, typeof innerDefaultArgs>> = {
  [CommManagerLayer.MasterManger]: innerDefaultArgs
}
```

| 层级 | 说明 |
|------|------|
| `CommManagerLayer.MasterManger`（6） | 圈主层级，当前唯一配置的层级，包含完整默认参数 |

> 其他层级（如子管理员层、粉丝层）暂未配置，使用时返回 `undefined`。
