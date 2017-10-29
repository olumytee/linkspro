<template>
  <div>
    <custom-header></custom-header>
    <div class="container">
      <div class="columns">
        <div class="column col-8 col-mx-auto col-md-12">
          <div class="empty" v-if="!top">
            <p class="empty-subtitle">You have not added any link yet</p>
            <div class="empty-action">
              <a class="btn btn-primary" href="/dashboard/add-links">Add a link</a>
            </div>
          </div>
          <div class="" v-if="top">
            <div class="text-center">
              <p :data-letters="page.substr(0, 1).toUpperCase()"></p>
              <p class="empty-subtitle text-center">{{`@${page}'s links`}}</p>
            </div>
            <div class="columns">
              <div class="column col-6 col-md-12">
                <a :href="top.url">
                  <div class="card">
                    <div class="card-image">
                      <img :src="top.meta.image.url" class="img-responsive">
                    </div>
                    <div class="card-header">
                      <div class="card-title h5">{{top.meta.site_name}}</div>
                    </div>
                    <div class="card-body">
                      {{top.meta.description}}
                    </div>
                  </div>
                </a>
              </div>
              <div class="column col-6 col-md-12">
                <div class="card">

                </div>
              </div>
            </div>
            <div>
              <h5></h5>
            </div>
            <div class="columns" v-if="links.length > 0">
              <div class="column col-4 col-md-12" v-for="i in links" :key="i._id">
                <a :href="i.url">
                  <div class="card">
                    <div class="card-header">
                      <div class="card-title h5">{{i.meta.title || 'Title'}}</div>
                      <div class="card-subtitle text-gray">{{i.meta.site_name || i.url}}</div>
                    </div>
                  </div>
                </a>
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
import axios from 'axios';
import CustomHeader from '@/components/header';
import CustomFooter from '@/components/footer';
import Sidebar from '@/components/sidebar';

export default {
  async asyncData({ params }) {
    try {
      const page = params.username;
      const url = `https://mycoo.link/api/u/${page}`;
      // const url = `http://localhost:3000/api/u/${page}`;
      const res = await axios.get(url);
      if (res.data && res.data.length > 0) {
        return {
          page: page,
          top: res.data[0],
          links: res.data.filter((v, i) => i !== 0)
        };
      } else {
        return {
          page: page,
          top: null,
          links: []
        };
      }
    } catch (e) {
      console.log(e.message);
    }
  },
  head() {
    return {
      title: `@${this.page}'s links`,
      // script: [
      //   { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' }
      // ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `@${this.page}'s links`
        }
      ]
    };
  },
  data() {
    return {};
  },
  components: {
    CustomHeader,
    CustomFooter
  }
};
</script>
<style>
.container {
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 1rem;
}

.card-image > img {
  min-width: 100%;
  height: 300px;
}

[data-letters]:before {
  content: attr(data-letters);
  display: inline-block;
  font-size: 1em;
  width: 2.5em;
  height: 2.5em;
  line-height: 2.5em;
  text-align: center;
  border-radius: 50%;
  background: plum;
  vertical-align: middle;
  margin-right: 1em;
  color: white;
}

.navbar {
  padding-left: 4rem;
  padding-right: 4rem;
}

@media only screen and (max-width: 840px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .navbar {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>