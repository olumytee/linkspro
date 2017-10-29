<template>
  <div id="wrap">
    <custom-header></custom-header>
    <div class="">
      <div class="columns text-center">
        <div class="column hero">
          <h1>Easy and free links collection and sharing for Publishers</h1>
					<span>thetool is a simple tool to help you collect and share your links</span>
				</div>
      </div>
      <div class="columns content--padding">
        <div class="column col-6 inner--padding">
					<h2>
						Collect links boom for publishers !
					</h2>
					<p>
						Open IG, go to "Edit your Instagram profile", paste your new URL and you're done. If you ever need to change your links, come back to LNK.bio and edit them without the need to change your URL on your IG profile.
					</p>
				</div>
        <div class="column col-6">
					<div class="columns">
						<div class="column col-6">
							<div class="card">
								Create your personal Url and place it in your Instagram Bio
							</div>
						</div>
						<div class="column col-6">
							<div class="card">
								With a cutting-edge interface, followers clicking on your Url will experience a great visual.
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column col-6">
							<div class="card">
								Add as many links as you wish, change them as often as you want
							</div>
						</div>
						<div class="column col-6">
							<div class="card">
								No need to install anything, just access anytime via browser from any device.
							</div>
						</div>
					</div>
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
  head() {
    return {
      title: 'Link in bio',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    };
  },
  mounted() {
    console.log('docHeight');
  },
  components: {
    CustomHeader,
    CustomFooter
  }
};
</script>

<style scoped>
.navbar {
  padding-left: 4rem;
  padding-right: 4rem;
}
.content--padding {
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.inner--padding {
  padding-right: 4rem;
}
.hero {
  color: #ffffff;
  padding: 8rem;
  padding-left: 14rem;
  padding-right: 14rem;
  background-color: #ec5d59;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23a78bde' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
.card {
  text-decoration: none;
  margin: 3% 2.5% 5%;
  padding: 20px 20px;
  width: 100%;
  background-clip: padding-box;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.1);
}
.card:hover {
  text-decoration: none;
  box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.15);
}
</style>
