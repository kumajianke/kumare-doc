# 社区模块 Resposity 文档

> 文件路径：`src/apps/community/comm_responsity.ts` | `src/apps/community/responsities/`

## 目录

| 函数名 | 简介 |
|--------|------|
| [addCommResponsity](#addcommresponsity) | 插入新社区记录 |
| [getCommListResponsity](#getcommlistresponsity) | 分页查询社区列表，支持多条件过滤 |
| [getCommListByIdsResponsity](#getcommlistbyidsresponsity) | 通过 ID 数组批量查询社区 |
| [getCommByIdResponsity](#getcommbyidresponsity) | 通过 ID 查询单个社区 |
| [removeCommResponsity](#removecommresponsity) | 逻辑删除社区 |
| [getSubManagerByCommIdAndUserId](#getsubmanagerbycommidanduserid) | 查询用户是否为社区子管理员 |
| [updateCommResponsity](#updatecommresponsity) | 更新社区基本信息 |
| [getUserCommRelaRowResponsity](#getusercommrelarowresponsity) | 查询用户与社区的关系记录 |
| [validateUserIsJoinedCommResponsity](#validateuserisjoiningcommresponsity) | 判断用户是否处于已加入状态 |
| [userJoinCommFristResponsity](#userjoincommfristresponsity) | 首次加入社区，插入成员记录 |
| [userReJoinCommResponity](#userrejoincommresposity) | 老用户重新加入社区 |
| [userExitCommResponity](#userexitcommresposity) | 用户退出社区 |
| [userCollectCommUpdateResponity](#usercollectcommupdateresposity) | 收藏社区 |
| [userCancelCollectCommUpdateResponity](#usercancelcollectcommupdateresposity) | 取消收藏社区 |
| [getCommSubManagerListResp](#getcommsubmanagerlistresp) | 查询社区所有子管理员 ID 列表 |
| [getCommPermissionRuleByCommIdResp](#getcommpermissionrulebycommidresp) | 查询社区权限规则配置 |
| [hasHighPermissionToManagerCommController](#hashighpermissiontomanagercommcontroller) | 判断用户是否有对社区的完全控制权 |
| [hasPermissionToManagerCommController](#haspermissiontomanagercommcontroller) | 判断用户是否有管理权限（含子管理员） |
| [getCommByIdWithCacheControlle](#getcommbyidwithcachecontrolle) | 通过 ID 查社区，优先走 Redis 缓存 |
| [userJoinCommController](#userjoincommcontroller) | 用户加入圈子（事务，自动区分新老用户） |
| [userJoinCommDBController](#userjoincommdbcontroller) | 加入圈子的纯数据库操作子步骤 |
| [exitCommController](#exitcommcontroller) | 用户退出圈子 |
| [collectCommController](#collectcommcontroller) | 用户收藏圈子（自动关注） |
| [cancelCollectCommController](#cancelcollectcommcontroller) | 用户取消收藏圈子 |
| [getUserCommRelaRowWithCacheByUIDController](#getusercommrelarowwithcachebyuidcontroller) | 获取用户与社区关系（缓存） |
| [hasPermissionManagerColumnController](#haspermissionmanagercolumncontroller) | 判断用户是否有管理权限（TODO） |
| [changePermissionManagerColumnController](#changepermissionmanagercolumncontroller) | 修改权限信息 |
| [getUserRoleController](#getuserrolecontroller) | 获取用户在社区中的角色（持久层） |
| [getUserRoleControllerWithCache](#getuserrolecontrollerwithcache) | 获取用户在社区中的角色（缓存优先） |
| [get_user_comm_role_cache](#get_user_comm_role_cache) | 获取用户身份缓存 |
| [set_user_comm_role_cache](#set_user_comm_role_cache) | 设置用户身份缓存 |
| [del_user_comm_role_cache](#del_user_comm_role_cache) | 删除用户身份缓存 |

---

## Resposity（comm_responsity.ts）

### addCommResponsity
:::success[tips]
向数据库插入一条新的社区记录，自动写入 `update_time`。
:::

**参数**
- `fields` : `AddComm` — 社区数据
  - `name` : `string` — 社区名称
  - `desc` : `string` — 社区描述
  - `is_public` : `boolean` — 是否公开
  - `manager_master_id` : `number` — 圈主用户 ID
  - `creator_id` : `number` — 创建者用户 ID
- `_db` : `tx_type | null` — 数据库连接（可选，默认使用全局 db）

**返回** 新插入社区的 `id` 列表

---

### getCommListResponsity
:::success[tips]
分页查询社区列表，支持按 `is_public`、`user_id`（圈主）、`name`（模糊搜索）过滤。
:::

**参数**
- `filter` : `CommListFilter | null` — 过滤条件（可选）
  - `is_public` : `boolean` — 是否公开
  - `user_id` : `number` — 圈主用户 ID
  - `name` : `string` — 社区名称（模糊匹配）
  - `is_deleted` : `boolean` — 是否已删除
- `offset` : `number` — 分页偏移量
- `limit` : `number` — 每页数量
- `_db` : `tx_type | null` — 数据库连接（可选）

**返回** 社区列表数组

---

### getCommListByIdsResponsity
:::success[tips]
通过 ID 数组批量查询多个社区详情（`IN` 查询）。
:::

**参数**
- `ids` : `number[]` — 社区 ID 数组（为空时直接返回 `[]`）
- `_db` : `tx_type | null` — 数据库连接（可选）

**返回** 社区列表数组

---

### getCommByIdResponsity
:::success[tips]
通过单个社区 ID 查询社区详情，不存在时返回 `null`。
:::

**参数**
- `id` : `number` — 社区 ID
- `_db` : `tx_type | null` — 数据库连接（可选）

**返回** 社区对象 | `null`

---

### removeCommResponsity
:::success[tips]
逻辑删除社区（将 `is_deleted` 设为 `true`，不物理删除数据）。
:::

**参数**
- `id` : `number` — 社区 ID
- `_db` : `tx_type | null` — 数据库连接（可选）

**返回** 数据库更新结果

---

### getSubManagerByCommIdAndUserId
:::success[tips]
查询某用户是否为指定社区的子管理员，存在则返回该记录，否则返回 `null`。
:::

**参数**
- `community_id` : `number` — 社区 ID
- `user_id` : `number` — 用户 ID
- `_db` : `tx_type | null` — 数据库连接（可选）

**返回** 子管理员记录 | `null`

---

### updateCommResponsity
:::success[tips]
更新社区基本信息，自动更新 `update_time`。使用 `cleanUpdateData` 过滤掉为空的字段。
:::

**参数**
- `cid` : `number` — 社区 ID
- `fields` : `UpdateComm` — 更新字段
  - `is_public` : `boolean | void`
  - `name` : `string | void`
  - `desc` : `string | void`
- `_db` : `tx_type | null` — 数据库连接（可选）

**返回** 数据库更新结果

---

### getUserCommRelaRowResponsity
:::success[tips]
查询用户与指定社区的关系记录（含退出状态、收藏状态等全部字段）。
:::

**参数**
- `cid` : `number` — 社区 ID
- `uid` : `number` — 用户 ID
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

**返回** 关系记录数组

---

### validateUserIsJoinedCommResponsity
:::success[tips]
查询用户是否处于"已加入且未退出"的状态（`is_exit = false`）。
:::

**参数**
- `cid` : `number` — 社区 ID
- `uid` : `number` — 用户 ID
- `tx` : `tx_type` — 数据库连接

**返回** 记录数组（长度 > 0 即已加入）

---

### userJoinCommFristResponsity
:::success[tips]
首次加入社区，向成员表插入一条新记录（`is_exit = false`）。
:::

**参数**
- `user_id` : `number` — 用户 ID
- `comm_id` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

---

### userReJoinCommResponity
:::success[tips]
老用户重新加入社区，将 `is_exit` 设为 `false` 并刷新 `lastest_join_time`。
:::

**参数**
- `user_id` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

---

### userExitCommResponity
:::success[tips]
用户退出社区，将 `is_exit` 设为 `true`。 并 取消特别关注: is_collect = false
:::

**参数**
- `user_id` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

---

### userCollectCommUpdateResponity
:::success[tips]
用户收藏社区。同时强制将 `is_exit` 设为 `false`（收藏即代表已加入），并记录收藏时间。
:::

**参数**
- `user_id` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

---

### userCancelCollectCommUpdateResponity
:::success[tips]
取消收藏社区，将 `is_collect` 设为 `false`（不影响加入状态）。
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

---

## Resposity（responsities/ 子目录）

### getCommSubManagerListResp
:::success[tips]
查询指定社区所有子管理员的用户 ID 列表。
:::

> 文件：`responsities/sub_manager_responsity.ts`

**参数**
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接

**返回** `{ id: number }[]`（每项为子管理员的 `user_id`）

---

### getCommPermissionRuleByCommIdResp
:::success[tips]
通过社区 ID 查询该社区的权限规则配置（最低付费积分门槛等），不存在时返回 `null`。
:::

> 文件：`responsities/comm_permission_rule_responsity.ts`

**参数**
- `comm_id` : `number` — 社区 ID
- `_db` : `tx_type` — 数据库连接（可选，默认使用全局 db）

**返回** 权限规则记录 | `null`

---

## Controller

> 文件：`comm_controller.ts`

### hasHighPermissionToManagerCommController
:::success[tips]
判断用户是否对社区有**完全控制权**（Admin / 创建者 / 圈主），被封禁或已删除的社区会拒绝。
:::

**参数**
- `cid` : `number` — 社区 ID
- `user` : `InferSelectModel<typeof user_model>` — 当前用户
- `_db` : `tx_type` — 数据库连接（默认使用全局 db）

**返回** `APIResponse`（200 = 有权限，403 = 无权限，404 = 社区不存在）

---

### hasPermissionToManagerCommController
:::success[tips]
判断用户是否有社区管理权限。先走高权限判断，不满足时再查子管理员列表。
:::

**参数**
- `user` : `InferSelectModel<typeof user_model>` — 当前用户
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接
- `skipHight` : `boolean` — 是否跳过圈主判断（默认 `false`）

**返回** `APIResponse | boolean`

---

### getCommByIdWithCacheControlle
:::success[tips]
通过社区 ID 查询社区详情，优先读 Redis 缓存，缓存未命中时查库并回填缓存。
:::

**参数**
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

**返回** 社区对象 | `null`

---

### userJoinCommController
:::success[tips]
用户加入圈子的完整事务。内部判断用户是否已在圈子中，若已加入则直接返回，否则调用数据库子步骤写入。
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID

**返回** `APIResponse`

---

### userJoinCommDBController
:::success[tips]
加入圈子的纯数据库操作子步骤。判断是首次加入（insert）还是重新加入（update），通常由 `userJoinCommController` 调用。
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库事务

**返回** `APIResponse`

---

### exitCommController
:::success[tips]
用户退出指定圈子，若用户未加入则返回 404。 若用户为圈主,退出失败, 提示需要转让操作.
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

**返回** `APIResponse`

---

### collectCommController
:::success[tips]
用户收藏圈子。若用户尚未关注该圈子，会先自动关注再收藏，并在返回数据中标注是否发生了关注行为。
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `user_comm_rale` : `InferSelectModel<typeof comm_members_model>[]` — 用户与社区的已有关系记录（可为空数组）
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

**返回** `APIResponse` — 含 `{ follow: boolean }` 表示是否同时触发了关注

---

### cancelCollectCommController
:::success[tips]
用户取消收藏圈子，若用户未关注则直接返回 200。
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `user_comm_rale` : `InferSelectModel<typeof comm_members_model>[]` — 用户与社区的已有关系记录
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

**返回** `APIResponse`

---

### getUserCommRelaRowWithCacheByUIDController
:::success[tips]
获取用户与社区的关系记录，优先查询 Redis 缓存。若缓存未命中，则查询数据库并回填缓存。
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `tx` : `tx_type` — 数据库连接（默认使用全局 db）

**返回** `comm_members_model` 对象 | `APIResponse` (404)

---

## Controller (column_controller.ts)

> 文件：`src/apps/community/comm_controller/column_controller.ts`

### hasPermissionManagerColumnController
:::success[tips]
判断指定用户是否有权限管理指定社区（TODO）。
:::

**参数**
- `cid` : `number` — 社区 ID
- `uid` : `number` — 用户 ID

**返回** `APIResponse`

---

### changePermissionManagerColumnController
:::success[tips]
用户修改权限信息。先检查权限，若有权限则执行修改（目前仅做了权限检查）。
:::

**参数**
- `cid` : `number` — 社区 ID
- `uid` : `number` — 用户 ID

**返回** `APIResponse` (403 if no permission)

---

### getUserRoleController
:::success[tips]
获取用户在社区中的角色（持久层查询）。在事务中依次判断：系统管理员 → 圈主 → 子管理员 → 粉丝用户层，并通过缓存查询用户与社区的关系记录。若用户未加入社区则返回空。
:::

**参数**
- `cid` : `number` — 社区 ID
- `user` : `InferSelectModel<typeof user_model>` — 用户对象

**返回**
- `comm_role` : `CommRole | null` — 角色枚举（未加入时为 `null`）
- `comm_role_instance` : `roleBasic | null` — 权限实例对象（未加入时为 `null`）

---

### getUserRoleControllerWithCache
:::success[tips]
获取用户在圈子中的身份（缓存优先）。先尝试命中 Redis 缓存（key: `user_role_in_comm:{uid},{cid}`），未命中则调用 `getUserRoleController` 查询持久层，并自动回填缓存。
:::

**参数**
- `cid` : `number` — 社区 ID
- `user` : `InferSelectModel<typeof user_model>` — 用户对象

**返回**
- `comm_role` : `CommRole | null` — 角色枚举
- `comm_role_instance` : `roleBasic | null` — 权限实例对象

---

## Cache（comm_cache.ts · 用户身份缓存）

> 文件：`src/apps/community/comm_cache.ts`
> Redis Key 格式：`user_role_in_comm:{uid},{cid}`

### get_user_comm_role_cache
:::success[tips]
获取用户在指定圈子的身份缓存。
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID

**返回** JSON 字符串 | `null`（未命中）

---

### set_user_comm_role_cache
:::success[tips]
设置用户在指定圈子的身份缓存，过期时间 3200 秒。存储内容为 `getUserRoleController` 的返回值（JSON 序列化）。
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
- `role` : `Record<string, any>` — 角色数据对象

---

### del_user_comm_role_cache
:::success[tips]
删除用户在指定圈子的身份缓存。
:::

**参数**
- `uid` : `number` — 用户 ID
- `cid` : `number` — 社区 ID
