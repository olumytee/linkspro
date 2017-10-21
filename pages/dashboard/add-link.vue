<template>
  <div class="off-canvas">
    <input type="checkbox" class="off-canvas-checkbox" id="sidebar-checkbox" name="sidebar-checkbox" hidden>
    <!-- off-screen toggle button and close mask -->
    <label class="off-canvas-toggle btn" for="sidebar-checkbox">
      <i class="icon icon-menu"></i>
    </label>
    <div class="off-canvas-sidebar">
      <!-- off-screen sidebar -->
      <sidebar></sidebar>
    </div>
    <div class="off-canvas-body">
      <custom-header></custom-header>
      <div class="container">
        <div class="columns">
          <div class="column">
            <h3>Add link</h3>
            <p class="text-error" v-if="errorMessage">{{errorMessage}}</p>
            <p class="text-success" v-if="successMessage">{{successMessage}}</p>
            <form class="" v-on:submit.prevent="add">
              <div class="columns">
                <div class="column col-1 col-md-12 small-margin">
                  <label class="form-label" for="input-example-1">URL</label>
                </div>
                <div class="column col-6 col-md-12 has-icon-right small-margin">
                  <input type="url" class="form-input" placeholder="" v-model="link">
                  <i class="form-icon" :class="{ 'loading': isLoading }"></i>
                </div>
                <div class="column col-2 col-md-12 small-margin">
                  <select class="form-select" v-model="collection">
                    <option disabled value="">Choose a collection</option>
                    <option v-for="i in $store.state.collectionsTable" :value="i.username" :key="i.username">{{i.username}}</option>
                  </select>
                </div>
                <div class="column col-2 col-md-12 small-margin">
                  <button class="btn btn-success btn-mod" v-bind:class="{ 'loading': isLoading }" type="submit">Add link</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CustomHeader from '@/components/header'
import CustomFooter from '@/components/footer'
import Sidebar from '@/components/sidebar'

export default {
  middleware: 'auth',
  data() {
    return {
      errorMessage: null,
      successMessage: null,
      isLoading: false,
      isAvailable: false,
      link: '',
      collection: '',
    }
  },
  mounted() {
    this.initData()
  },
  components: {
    CustomHeader, CustomFooter, Sidebar
  },
  methods: {
    add() {
      this.isLoading = true;
      this.errorMessage = null;
      axios.post('/api/link', {
        url: this.link,
        collection: this.collection
      })
        .then((res) => {
          this.link = this.collection = ''
          this.loginPassword = ''
          this.successMessage = 'Link added'
          this.isLoading = false
        })
        .catch((e) => {
          console.log(e)
          this.isLoading = false
          this.errorMessage = e.response.data.message ? e.response.data.message : 'There was an error'
        })
    },
    initData() {
      this.$store.dispatch('load_dashboard')
        .then((res) => {
          console.log('done')
        })
        .catch((e) => {
          console.log(e)
          this.isLoading = false
        })
    },
  }
}
</script>
<style scoped>
.off-canvas .off-canvas-sidebar {
  padding: 0rem;
}

.off-canvas-body {
  min-width: 100%;
}

.container {
  padding-left: 1rem;
  padding-right: 4rem;
  padding-top: 1rem;
}

.form-label {
  padding: 8px 0;
}

@media only screen and (max-width: 840px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .form-label {
    padding: 0;
  }
  .small-margin {
    margin-bottom: 4px;
  }
}
</style>