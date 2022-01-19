<template>
  <header class="section-header">
    <section class="header-main border-bottom bg-white py-5">
      <b-container>
        <b-row>
          <b-col cols="3">
            <b-skeleton animation="throb" type="input" />
          </b-col>
          <b-col cols="7">
            <b-skeleton animation="throb" width="85%" />
            <b-skeleton animation="throb" width="55%" />
          </b-col>
          <b-col cols="1">
            <b-skeleton animation="throb" type="avatar" />
          </b-col>
          <b-col cols="1">
            <b-skeleton animation="throb" type="avatar" />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </header>
</template>
<script>
export default {
  name: 'Header'
};
</script>
