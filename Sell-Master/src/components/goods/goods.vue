<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" :key="item.name" class="menu-item" :class="{'current': currentIndex === index}"
                @click="selectMenu(index,$event)">
                    <span class="text border-1px" >
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook" :key="item.name">
                    <h1 class="title">
                        {{item.name}}
                    </h1>
                    <ul>
                        <li v-for="(food, index) in item.foods" :key="index" class="food-item border-1px">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57" />
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :delivery-price="seller.deliveryPrice" :minPrice="seller.minPrice" :select-foods="selectFoods"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScorll from 'better-scroll'
    import shopcart from '@/components/shopcart/shopcart'
    import cartcontrol from '@/components/cartcontrol/cartcontrol'
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrolly: 0,
                selectedFood: {}
            }
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i]
                    let height2 = this.listHeight[i + 1]
                    if (this.scrolly >= height1 && this.scrolly < height2) {
                        return i + 1
                    } else if (this.scrolly === 0) {
                        return 0
                    }
                }
                return 0
            },
            selectFoods() {
                let foods = []
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            }
        },
        created() {
            this.$http.get('/api/goods').then((response) => {
                response = response.body
                if (response.code === 0) {
                    this.goods = response.data
                    this.$nextTick(function() {
                        this.initScorll()
                        this.calculateHeight()
                    })
                }
            })
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        },
        methods: {
            calculateHeight() {
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
                let height = 0
                for (let i = 0; i < foodList.length; i++) {
                    height += foodList[i].clientHeight
                    this.listHeight.push(height)
                }
            },
            initScorll() {
                this.menuScroll = new BScorll(
                    this.$refs.menuWrapper, {
                        click: true
                    }
                )
                this.foodScroll = new BScorll(
                    this.$refs.foodWrapper, {
                        click: true,
                        probeType: 3
                    }
                )
                this.foodScroll.on('scroll', (pos) => {
                    this.scrolly = Math.abs(Math.round(pos.y))
                })
            },
            selectMenu(index, event) {
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
                let el = foodList[index]
                this.foodScroll.scrollToElement(el, 300)
            }
        },
        components: {
            shopcart,
            cartcontrol
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '../../common/scss/mixins.styl'
    .goods
        display: flex
        position: absolute
        top: 174px
        width: 100%
        bottom: 46px
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                width: 56px
                height: 54px
                line-height: 14px
                padding: 0 12px
                &.current
                    position: relative
                    margin-top: -1px
                    z-index: 10
                    background: #fff
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    font-size: 12px
                    border-1px(rgba(7, 17, 27, 0.1))
        .foods-wrapper
            flex: 1
            .title
                line-height: 26px
                height: 26px
                font-size: 12px
                color: rgb(147, 153, 159)
                padding-left: 14px
                background: #f3f5f7
                border-left: 2px solid #d9dde1
            .food-item
                display: flex
                padding: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px
                        line-height: 14px
                        font-size: 14px
                    .desc, .extra
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        line-height: 10px
                        margin-bottom: 8px
                    .count
                        margin-right: 12px
                    .price
                        display: inline-block
                        vertical-align: top
                        line-height: 24px
                        font-weight: 700
                    .cartcontrol
                        display: inline-block
                        vertical-align: top
                        position: absolute
                        right: 16px
                    .now
                        font-size: 14px
                        color: rgb(240, 20, 20)
                        margin-right: 8px
                    .old
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        text-decoration: line-through
</style>
