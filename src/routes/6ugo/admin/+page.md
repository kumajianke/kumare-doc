# 管理员模块 Repository 文档

> 文件路径：`src/apps/admin/repository/invite_code_repository.ts` | `src/apps/admin/repository/user_repository.ts`

## 目录

| 函数名 | 简介 |
|--------|------|
| [bulkInsertInviteCodes](#bulkinsertinvitecodes) | 批量分片并发插入邀请码 |
| [findAvailableInviteCode](#findavailableinvatecode) | 查询邀请码是否有效且未使用 |
| [markInviteCodeUsed](#markinvitecodeused) | 将邀请码标记为已使用 |
| [insertUser](#insertuser) | 插入新用户记录（底层，无业务校验） |
| [updateUserRole](#updateuserrole) | 更新用户角色 |

---

## Repository（invite_code_repository.ts）

### bulkInsertInviteCodes
:::success[tips]
批量插入邀请码。内部自动按每批 500 条进行分片，并发写入数据库，防止单条 SQL 超出 `max_allowed_packet` 限制。
:::

**参数**
- `codes` : `string[]` — 邀请码字符串数组
- `tx` : `tx_type` — 数据库事务（可选，默认使用全局 db）

---

### findAvailableInviteCode
:::success[tips]
在事务内查询指定邀请码是否有效（存在且未被使用）。**必须在事务内调用**，配合后续操作保证原子性。
:::

**参数**
- `code` : `string` — 邀请码字符串
- `tx` : `tx_type` — 数据库事务（必填）

**返回** 邀请码记录 | `null`（不存在或已使用时返回 `null`）

---

### markInviteCodeUsed
:::success[tips]
将邀请码标记为已使用（`is_used = true`）。**必须在事务内调用**，通常在核销邀请码后紧接调用。
:::

**参数**
- `id` : `number` — 邀请码记录 ID
- `tx` : `tx_type` — 数据库事务（必填）

---

## Repository（user_repository.ts）

### insertUser
:::success[tips]
向数据库插入一条新用户记录，返回新生成的用户 ID。作为底层写入操作，不含业务校验。
:::

**参数**
- `data` : `object` — 用户数据
  - `username` : `string` — 用户名
  - `password` : `string` — 密码（可选）
  - `email` : `string` — 邮箱（可选）
- `tx` : `tx_type` — 数据库事务（必填）

**返回** `{ id: number }[]`

---

### updateUserRole
:::success[tips]
更新指定用户的角色（如 `Guest → Default`）。底层操作，通常在邀请码核销后紧接调用。
:::

**参数**
- `userId` : `number` — 用户 ID
- `role` : `UserRole` — 目标角色（`Guest` / `Default` / `Admin`）
- `tx` : `tx_type` — 数据库事务（必填）
