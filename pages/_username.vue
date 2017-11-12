<template>
  <div>
    <custom-header></custom-header>
    <div class="container">
      <div class="columns">
        <div class="column col-8 col-mx-auto col-md-12">
          <div class="" v-if="top.length > 0">
            <div class="text-center">
              <p :data-letters="page.substr(0, 1).toUpperCase()"></p>
              <p class="empty-subtitle text-center">{{`@${page}'s links`}}</p>
            </div>
            <div class="columns">
              <div class="column col-6 col-md-12" v-for="i in top" :key="i._id">
                <a :href="i.url">
                  <div class="card">
                    <div class="card-image">
                      <img :src="i.meta.image" class="img-responsive">
                    </div>
                    <div class="card-header">
                      <div class="card-title h5">{{i.meta.title}}</div>
                    </div>
                    <div class="card-body">
                      {{i.meta.description}}
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <h5></h5>
            </div>
            <div class="columns" v-if="links.length > 0">
              <div class="column col-6 col-md-12" v-for="i in links" :key="i._id">
                <a :href="i.url">
                  <div class="card">
                    <div class="card-header">
                      <div class="card-title h5">{{i.meta.title || 'Title'}}</div>
                      <div class="card-subtitle text-gray">{{i.meta.description}}</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="empty" v-else>
            <p class="empty-subtitle">You have not added any link yet</p>
            <div class="empty-action">
              <a class="btn btn-primary" href="/dashboard/add-links">Add a link</a>
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
          top: res.data.filter((v, i) => i === 0 || i === 1),
          links: res.data.filter((v, i) => i !== 0 || i !== 1 )
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
  mounted() {
    if (this.page == undefined) {
      window.location.replace('/404');
    }
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
.card {
  text-decoration: none;
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

@media only screen and (max-width: 840px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>