

// 动态类别
let category = {
    name: String
}

// 动态
let dynamic = {
    content: String,
    images: Array,
    create_time: Date,
    category_id: Number,
    author_id: Number,
    comment_ids: Array, // commont表id集合
    like_ids: Array // user表id集合
}

// 用户
let user = {
    state: Number, //-1 隐身 0 下线 1 在线
    username: String,
    account: String,
    password: String,
    head_img_url: String,
    age: Number,
    sign: String,
    hobbies: Array,
    birthday: String,
    hometown: String,
    follow_ids: Array, // user表id集合
    fan_ids: Array,// user表id集合
    dynamic_ids: Array,// dynamic表id集合
    new_user_ids: Array,// new表对应的联系人
}

// 评论
let comment = {
    user_id: Number,
    content: String,
    address: String
}


// 消息
let news = {
    user_ids: Array, // 两个user_id
    content: Array
}


// 消息表内容
let new_contents = {
    content: String,
    create_time: Date
}


