<template>
  <!--begin::Stats Widget 12-->
  <div class="card card-custom card-stretch card-stretch-half gutter-b">
    <!--begin::Body-->
    <div class="card-body d-flex flex-column p-0">
      <div class="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
        <span class="symbol symbol-circle symbol-50 symbol-light-primary mr-2">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-4x svg-icon-dark">
              <inline-svg
                src="asset/img/svg/icon/code/Info-circle.svg"
                title="Please subscribe your Business"
                class="svg-icon-xl svg-icon-primary"
              />
            </span>
          </span>
        </span>
        <div class="d-flex flex-column text-right">
          <span class="text-dark-75 font-weight-bolder font-size-h3"> {{ title }} </span>
          <span class="text-muted font-weight-bold mt-2"> {{ message }} </span>
        </div>
      </div>
      <!--begin::Chart-->
      <div class="py-12 my-8" />
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Stats Widget 12-->
</template>

<script>
export default {
  name: 'Feed',
  props: {
    title: String,
    message: String
  }
};
</script>
