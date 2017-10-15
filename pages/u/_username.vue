<template>
  <div>
    <custom-header></custom-header>
    <div class="container">
      <div class="columns">
        <div class="column col-8 col-mx-auto col-md-12">
          <div class="empty" v-if="!links">
            <p class="empty-subtitle">You have not added any link yet</p>
            <div class="empty-action">
              <a class="btn btn-primary" href="/dashboard/add-links">Add a link</a>
            </div>
          </div>
          <div class="" v-else>
            <div class="card">
              <div class="card-image">
                <img :src="toplink.meta.image.url" class="img-responsive">
              </div>
              <div class="card-header">
                <div class="card-title h5">{{toplink.meta.site_name}}</div>
              </div>
              <div class="card-body">
                {{toplink.meta.description}}
              </div>
              <div class="card-footer">
                <a class="btn btn-primary" :href="toplink.url">Open web page</a>
              </div>
            </div>
            <a v-for="i in links" :key="i._id" :href="i.url">
              <div class="card">
                <div class="card-header">
                  <div class="card-title h5">{{i.meta.title || 'Title'}}</div>
                  <div class="card-subtitle text-gray">{{i.meta.site_name}}</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import axios from 'axios'
import CustomHeader from '@/components/header'
import CustomFooter from '@/components/footer'
import Sidebar from '@/components/sidebar'

export default {
  async asyncData({ params }) {
    try {
      const page = params.username
      const res = await axios.get(`http://localhost:3000/api/u/${page}`)
      return {
        toplink: res.data[0],
        links: res.data.filter((v, i) => i !== 0)
      }
    } catch (e) {
      console.log(e.message)
    }
  },
  data() {
    return {

    }
  },
  components: {
    CustomHeader, CustomFooter
  },
  filters: {

  },
  methods: {

  }
}
</script>
<style>
.container {
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 1rem;
}

.card-image>img {
  min-width: 100%;
}

@media only screen and (max-width: 840px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>