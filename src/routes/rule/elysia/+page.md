# Elysia
## 项目结构
- root
    - src
        - **apps** 所有的微服务
        - **plugins** 通用性插件 类似 `shared`
        - `index.ts` 主要的运行程序

## 分层设计
:::tip[Tips]
项目累计五层

Service 责任层 -> [-> Domain 领域层] -> Controller 控制层  -> [Decision 决策层] -> Responsity 数据层 
:::

### Controller 控制器

#### 命名规范
使用驼峰命名, 结尾为 Controller, 如 `getUserDetailController`, `validateUserIsAdminController`, 一般的采用

- 数据操作类型控制器
    - **作用** 一般是给为了对数据直接进行增删改查的事务实现的控制器, 如`获取缓存层和持久层两个层保持一致性的用户数据`
    - `{操作类型}{资源方式}[With{技术}][By{字段}]` 的方式 如: `getUserDetailWithCacheByUIDController`. 
    - 当获取资源的方式是固定的层级的时候可以不加比如 `getCommHotvalueZset`
    > Zset是Redis里的一个数据类型 假设业务中只能在Redis获取Zset 
    - 当获取的资源通识认为都有一个技术栈的时候可以不写 比如获取用户数据默认都会去拿数据库的所以可以不写数据库的信息: 错误例子 `getUserWithDB`
    > 默认只有DB的时候最好移到`Responsity` 除非是一个事务操作或者需要额外的计算(比如加密验证密码)
    - out表示当前的反逻辑 比如`WithXXX_outXXX2` | `getAll_outPwd`, 使用_连接上一个操作符.
    - 当获取的资源不会用到默认的技术栈的时候需要使用`Without`限制, 比如只拿取消息队列的数据 `getUserMessageWithRMQ_OutDB`
    - 常见动作
        - get 获取
        - list 获取多个
        - remove 删除
        - set/update 修改 
            - 前者对单一字段 后者对多个字段 如不确定 默认使用update
        > 如果是业务动作限制默认规定业务动作 比如 `userLoginByEmailController`


:::tip[Tip]
- 宽泛使用`Fat Controller`, 一个Controller不能处理多个业务, 如果业务极其复杂最好fork出多个子控制器, 子控制器可以放在一个单独的文件中比如
    -  APP/
        - Controllers/
            - XXXController.child.ts
        - APPController.ts
- 注意微服务的根目录只有一个Controller 如果要创建其他的Controller 应该放在Controllers子目录下
- 在驼峰中使用_属于反逻辑除了规范特别要求其他情况严禁使用
:::

#### 主要职责
- 业务实现类型控制器
    - **作用** 一般是为了实现一个具体的业务而实现的控制器, 比如 `用户传入密码账号进行登录的控制器`
    - `{行为}With{技术}By{字段} ` 如: `userLoginByPasswordWithTokenVerifyController` 当技术是一个通用手段的时候可以不加`With`, 简化为 `userLoginByPasswordController`
- 大查询事务类型控制器
    - **作用** 一般是用于多个curd操作的时候使用, 保持数据一致性, 如`查询符合指定身份的用户分别关注的资源信息`
- 多个存储数据库事务类型控制器
    - **作用** 一般是用于多个数据库操作的时候使用, 保持数据一致性, 如`从缓存\消息队列\数据仓库\数据库\Easearch...获取数据`


#### 待实验
- 所有的包含cache（缓存层）的控制器最好归档在一个地方

### Service 责任层
- 责任层的命名规则是`{业务名称}Service` 如 `loginService` | `SendMessageService`
- 命名的时候避免充满数据库操作的味道要切合业务信息进行制定.

#### 主要职责
- 一般用于解耦从app下来的ctx(上下文参数) 协调整合拆分后的`FatController`多个逻辑控制器

### ServiceDomain 领域层
:::success[TIP]
该层属于利用DDD设计细分的层级, 只有大型微服务才会启用 是一个可选项
:::
#### 命名规范
- 领域层默认是Service的子项一切遵守责任层的设计 需要注意的是结尾需要为: `Domain`.  如 
- 领域层一般是多个文件, 统一放在`{AppName}Domains/` 的文件夹中
#### 主要职责
- 对查询的数据进行验证和设置 该操作不涉及数据层的crud
- 负责计算钱如何计算 状态如何修改等操作 
    - 如复杂的身份验证 数据库查询出对应数据 领域层将其封装数据类 进行统一计算


### Responsity 数据层
#### 命名规范
可参考Controller 默认结尾时Responsity.

#### 主要职责
- 在规范中和常见的`Repository`不一致, `Responsity`属于对任何数据库都进行操作的层级, 在规范中, Responsity只处理持久性数据库的操作

### Decision 决策层
#### 命名规范
- 由 `{APP}Decision[s/]` 定义目录或者文件夹
- 函数是 `{层级作用}Decision` 或者 `{层级}Derive` 两种写法

#### 职责
- 一般被用于中间件的层级, 也就是Elysia中定义`derive`的数据,用于拦截用户的权限\风控等信息


### Model
数据库的ORM模型， 如 `studentModel` 文件里面的 `student_model` 模型。

#### 待实验
- 所有主键设置为bigint mode设置为bigint 代码设置

```ts
BigInt.prototype.toJSON = function () {
  return this.toString();
};
```

- InferSelectModel 的内容放在 model.infer.ts 中
