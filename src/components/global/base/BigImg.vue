<template>
  <!-- 过渡动画 -->
  <!--<transition name="fade">-->
  <div class="img-view" @click="bigImg" >
    <!-- 遮罩层 -->
    <div class="img-layer" id="layer"></div>
    <div class="img" id="img">
      <img :src="imgSrc">
    </div>
  </div>
  <!--</transition>-->
</template>

<script>
    export default {
      name: "BigImg",
      props: ['imgSrc'],
      data() {
        return {}
      },
      methods: {
        bigImg() {
          this.$emit('clickit')
        }
      }
    }
</script>

<style scoped>
  /*动画*/
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3D(100%, 0, 0);
  }


  /* bigimg */

  .img-view {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /*遮罩层样式*/
  .img-view .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /*不限制图片大小，实现居中*/
  .img-view .img img {
    max-width: 80%;
    display: block;
    /*position: absolute;*/
    position: fixed;
    left: 0;
    right: 0;
    top:7.5%;
    margin: auto;
    z-index: 1000;

    /*width: 80%;*/
    height: 80%;
    /*border: 15px solid deepskyblue;*/
    /*border-radius:15px;*/
    background:#626262;
    border-radius:15px;
    border-style:ridge;
    border-width:10px;
    border-color:deepskyblue;

  }
</style>
