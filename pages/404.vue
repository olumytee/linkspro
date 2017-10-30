<template>
  <div>
    <custom-header></custom-header>
    <div class="">
      <div class="columns">
        <div class="column hero text-center">
          <h1>404</h1>
					<span>thetool is a simple tool to help you collect and share your links</span>
				</div>
      </div>
    </div>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import CustomHeader from '@/components/header';
import CustomFooter from '@/components/footer';
export default {
  components: {
    CustomFooter,
    CustomHeader
  }
};
</script>
<style>
.container {
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 1rem;
}

.hero {
  color: #ffffff;
  padding: 8rem;
  padding-left: 14rem;
  padding-right: 14rem;
  background-color: #ec5d59;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23a78bde' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}

@media only screen and (max-width: 840px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .content--padding {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .hero {
    color: #ffffff;
    padding: 2rem;
  }
  .inner--padding {
    padding: 20px 20px;
  }
}
</style>