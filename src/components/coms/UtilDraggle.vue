<template>
  <div class="mini-draggle">
    <div id="d1">
      <div id="d2">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <ul>
          <li>Item 4</li>
          <li>Item 5</li>
          <li>Item 6</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UtilDraggle"
}
</script>
<script lang="js" setup>

</script>
<style scoped lang="scss">
#d1 {
  width: 800px;
  height: 800px;
  background-color: #ddd;
  #d2 {
    width: 200px;
    height: 200px;
    background-color: pink;
  }
}


</style>
