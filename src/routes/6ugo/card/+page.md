# 卡牌模块 Controller & Resposity 文档

> 文件路径：`src/apps/card/card_controller.ts` | `src/apps/card/card_resposity.ts`

## 目录

| 函数名 | 简介 |
|--------|------|
| [getCardByKeyViaCacheController](#getcardbykeyviacacheccontroller) | 通过 Key 查卡牌，优先走 Redis 缓存 |
| [usedCardController](#usedcardcontroller) | 核销卡牌，发放奖励并记录消费日志 |
| [getGoodsCreditOrVipController](#getgoodscreditorvipcontroller) | 按商品类型发放积分或延长 VIP |
| [addCardResposity](#addcardrsposity) | 批量插入卡牌记录 |
| [getCardByKeyResposity](#getcardbykeyresposity) | 通过 Key 直接查询数据库（无缓存） |
| [usedCardUpdateCardUsedResposity](#usedcardupdatecardusedresposity) | 将卡牌状态标记为已使用 |
| [addCardHistoryResposity](#addcardhistoryresposity) | 写入卡牌消费历史记录|

---

## Controller

### getCardByKeyViaCacheController
:::success[tips]
通过卡牌 Key 查询卡牌信息，优先走 Redis 缓存，缓存未命中时查询数据库并回填缓存（缓存有效期 3600 秒）。
:::

**参数**
- `card_key` : `string` — 卡牌唯一 Key

**返回** `InferSelectModel<typeof card_model> | null`

---

### usedCardController
:::success[tips]
使用（核销）一张卡牌。先清除该卡牌的 Redis 缓存，再在事务内完成积分/VIP 发放、状态更新以及消费记录写入。
:::

**参数**
- `card` : `InferSelectModel<typeof card_model>` — 卡牌对象
- `user` : `InferSelectModel<typeof user_model>` — 操作用户对象

**返回** `APIResponse`

---

### getGoodsCreditOrVipController
:::success[tips]
根据卡牌商品类型，给用户发放对应的免费积分、付费积分或延长 VIP。是 `usedCardController` 的内部子步骤。
:::

**参数**
- `goods_type` : `string` — 商品类型（对应 `card_goods_prop` 的 key）
- `user` : `InferSelectModel<typeof user_model>` — 目标用户对象
- `tx` : `tx_type | null` — 数据库事务（默认使用全局 db）

**返回** `APIResponse | void`

---

## Resposity

### addCardResposity
:::success[tips]
批量向数据库插入卡牌记录。
:::

**参数**
- `value` : `InferSelectModel<typeof card_model>[]` — 卡牌数据数组

**返回** 数据库插入结果

---

### getCardByKeyResposity
:::success[tips]
通过卡牌 Key 直接查询数据库（无缓存层），返回单张卡牌或 null。
:::

**参数**
- `card_key` : `string` — 卡牌唯一 Key

**返回** `InferSelectModel<typeof card_model> | null`

---

### usedCardUpdateCardUsedResposity
:::success[tips]
将指定卡牌的使用状态更新为 `2`（已使用）。通常在事务内调用。
:::

**参数**
- `card_key` : `string` — 卡牌唯一 Key
- `user` : `InferSelectModel<typeof user_model>` — 使用者（当前未用于查询条件，预留）
- `tx` : `tx_type | null` — 数据库事务（默认使用全局 db）

---

### addCardHistoryResposity
:::success[tips]
向卡牌消费历史表写入一条使用记录。
:::

**参数**
- `user` : `InferSelectModel<typeof user_model>` — 使用者用户对象
- `key` : `string` — 卡牌 Key
- `goods_type` : `string` — 商品类型
- `tx` : `tx_type` — 数据库事务（默认使用全局 db）
