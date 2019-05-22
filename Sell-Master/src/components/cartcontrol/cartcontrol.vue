<template>
	<div class="cartcontrol">
        <transition name="move">
             <div class="cart-decrease icon-remove_circle_outline"
             v-show="food.count > 0"
             @click="decreaseCart">
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script   type="text/ecmascript-6">
import Vue from 'vue'
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart() {
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
        },
        decreaseCart() {
            if (this.food.count > 0) {
                this.food.count--
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cartcontrol
    font-size: 0
    .cart-decrease
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        &.move-enter-active,
        &.move-leave-active
            transition: all 1s
            transform: translate3d(0,0,0)
        &.move-enter,
        &.move-leave-active
            opacity: 0
            transform: translate3d(24px,0,0)
    .cart-count
        display: inline-block
        width: 24px
        font-size: 12px
        line-height: 24px
        color: rgb(147,153,159)
        vertical-align: top
        text-align: center
    .cart-add
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(147,153,159)
</style>
