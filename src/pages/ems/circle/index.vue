<template>
  <div>
    <Tabs size="small">
      <TabPane label="动态列表">
        <list></list>
      </TabPane>
      <TabPane label="评论管理">
        <comment></comment>
      </TabPane>
    </Tabs>
  </div>

</template>

<script>
import List from './components/list'
import Comment from './components/comment'
export default {
  components: {
    List,
    Comment
  }
}
</script>
