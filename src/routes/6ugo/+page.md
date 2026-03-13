# 6ugo API 内部模块文档

本章节记录平台各业务模块的 **Controller** 和 **Resposity** 函数，供内部开发者查阅。

> ⚠️ 这些是内部服务层函数，不是对外 HTTP 接口文档。

## 模块导航

| 模块 | 路径 | 说明 |
|------|------|------|
| [用户模块](/6ugo/users) | `apps/user/` | 注册、登录、积分、VIP、邀请码激活等 |
| [卡牌模块](/6ugo/card) | `apps/card/` | 卡牌核销、积分/VIP 发放等 |
| [社区模块](/6ugo/community) | `apps/community/` | 社区 CRUD、成员管理、收藏等 |
| [管理员模块](/6ugo/admin) | `apps/admin/` | 邀请码批量生成、用户角色管理等 |