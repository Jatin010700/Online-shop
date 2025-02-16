<script setup>
defineProps({
  intro: String,
  msg: String,
})

</script>

<template>
<div class="headerContainer">

  <div class="headerSub1">
    <div class="headerText1">
        <h1>{{ intro }}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quos sunt ratione dolor exercitationem minima quas itaque saepe 
        quasi architecto vel! Accusantium, 
        vero sint recusandae cum tempora nemo commodi soluta deleniti.
      </p>
    </div>
    <div class="wrapImg1">
      <img src="../../assets/headset.jpg" class="" alt="" width="500px" height="100%"/>
      <p class="discount">-50%</p>
      <p class="imgName">Headset scarlet version 2.58</p>
    </div>
  </div>
  

  <div class="headerSub2"><div class="headerText2">
    <h1>{{ msg }}</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quos sunt ratione dolor exercitationem minima quas itaque saepe 
      quasi architecto vel! Accusantium, 
      vero sint recusandae cum tempora nemo commodi soluta deleniti.
    </p>
  </div>
    <img src="../../assets/laptop.jpg" class="" alt="" width="500px" height="100%"/>
    <p class="imgName">Laptop Asus version 1.538</p>
  </div>
</div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 50px;
}

.headerContainer {
  display: flex;
  justify-content: space-between;
  position: relative;

  .headerSub1 {
    position: relative;
    margin-left: 100px;

    .headerText1 {
      margin-top: 30px;

      p {
        width: 50%;
      }
    }

    .wrapImg1 {
      position: absolute;
      left: 0;
      bottom: -340px;
      z-index: 1;

      img {
        height: auto;
      }

      .discount {
        position: absolute;
        top: -15px;
        right: -15px;
        background-color: white;
        color: black;
        font-size: 20px;
        padding: 5px 10px;
    }

      .imgName {
        position: absolute;
        bottom: 80px;
        left: -50px;
        transform: rotate(270deg);
      }
    }
  }
  
  .headerSub2 {
    position: relative;

    .headerText2 {
      position: absolute;
      left: -100px;
      top:200px;

      p {
        width: 50%;
      }
    }

    .imgName {
      position: absolute;
      top: 70px;
      right: -40px;
      transform: rotate(90deg);
    }
  }
}

</style>
