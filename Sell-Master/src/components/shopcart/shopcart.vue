<template>
	<div class="shopcart">
        <div class="content">
            <div class="conent-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalCount > 0}">
                        <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
                    </div>
                    <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                </div>
                <div class="price">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">{{payDesc}}</div>
            </div>
        </div>
    </div>
</template>

<script   type="text/ecmascript-6">
export default {
    props: {
        deliveryPrice: {
            type: Number
        },
        selectFoods: {
                type: Array,
                default() {
                    return []
                }
        },
        minPrice: {
            type: Number
        }
    },
    computed: {
        totalCount() {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        totalPrice() {
            let price = 0
            this.selectFoods.forEach((food) => {
                price += food.price * food.count
            })
            return price
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}起送`
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice
                return `还差￥${diff}元起送`
            } else {
                return `去结算`
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return `noenough`
            } else {
                return `enough`
            }
        }
    }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/scss/mixins"
    .shopcart
        position: fixed
        width: 100%
        bottom: 0
        height: 48px
        .content
            display: flex
            background: #141d27
            font-size: 0
            color: rgba(255,255,255,0.4)
            .conent-left
                flex: 1
                .logo-wrapper
                    display: inline-block
                    vertical-align: top
                    position: relative
                    top: -15px
                    margin: 0 18px
                    width: 54px
                    height: 54px
                    padding: 6px
                    border-radius: 50%
                    background: #141d27
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        background: #2b343c
                        text-align: center
                        &.highlight
                            background: rgb(0,160,220)
                        .icon-shopping_cart
                            font-size: 24px
                            line-height: 54px
                            color: #80858a
                            &.highlight
                                color: #fff
                    .num
                        width: 24px
                        height: 16px
                        text-align: center
                        position: absolute
                        top: 0
                        right: 0
                        font-size: 9px
                        font-weight: 700
                        border-radius: 16px
                        color: rgb(255,255,255)
                        line-height: 16px
                        background-color: rgb(240,20,20)
                        box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4)
                .price
                    display: inline-block
                    font-size: 16px
                    font-weight: 700
                    margin-top: 14px
                    padding-right: 12px
                    border-right: 1px solid rgba(255, 255, 255,0.1)
                    box-sizing: border-box
                .desc
                    display: inline-block
                    font-size: 12px
                    color: rgb(255,255,255,0.4)
                    font-weight: 700
                    line-height: 24px
                    margin-left: 12px
            .content-right
                flex: 0 0 105px
                width: 105px
                .pay
                    height: 48px
                    font-size: 12px
                    font-weight: 700
                    line-height: 48px
                    text-align: center
                    &.noenough
                        background: #2b333b
                    &.enough
                        background: #00b43c
                        color: #fff
</style>
