<template>
  <div>
    <custom-header></custom-header>
    <div class="container">
      <div class="columns">
        <div class="column col-3">
          <sidebar></sidebar>
        </div>
        <div class="column col-9">
          <h3>Add link</h3>
          <p class="text-error" v-if="errorMessage">{{errorMessage}}</p>
          <p class="text-success" v-if="successMessage">{{successMessage}}</p>
          <form class="form-horizontal" v-on:submit.prevent="add">
            <div class="form-group">
              <div class="col-1">
                <label class="form-label" for="input-example-1">URL</label>
              </div>
              <div class="col-6 has-icon-right">
                <input type="url" class="form-input" placeholder="" v-model="link">
                <i class="form-icon" :class="{ 'loading': isLoading }"></i>
              </div>
              <div class="col-2">
                <select class="form-select" v-model="account">
                  <option disabled value="">Choose an account</option>
                  <option v-for="i in $store.state.accountsTable" :value="i.username" :key="i.username">{{i.username}}</option>
                </select>
              </div>
              <div class="col-2">
                &nbsp;
                <button class="btn btn-success btn-mod" v-bind:class="{ 'loading': isLoading }" type="submit">Add link</button>
              </div>
            </div>
          </form>
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
  middleware: 'auth',
  data() {
    return {
      errorMessage: null,
      successMessage: null,
      isLoading: false,
      isAvailable: false,
      link: '',
      account: '',
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
        account: this.account
      })
        .then((res) => {
          this.link = this.account = ''
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
.container {
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 1rem;
}

.form-label {
  padding: 8px 0;
}
</style>