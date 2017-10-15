<template>
  <div>
    <custom-header></custom-header>
    <div class="container">
      <div class="columns">
        <div class="column col-3">
          <sidebar></sidebar>
        </div>
        <div class="column col-7">
          <h3>Add account</h3>
          <div>
            <p></p>
            <p>
              Type in an account name. This should ideally be your instagram username. For example if your instagram username is 'beyonce', you should enter 'beyonce' below so that you can get the bio link
              <a href="#">thegram.bio/u/beyonce</a>
            </p>
          </div>
          <p class="text-error" v-if="errorMessage">{{errorMessage}}</p>
          <p class="text-success" v-if="successMessage">{{successMessage}}</p>
          <form class="form-horizontal" v-on:submit.prevent="add">
            <div class="form-group">
              <div class="col-2">
                <label class="form-label" for="input-example-1">Account name</label>
              </div>
              <div class="col-6 has-icon-right">
                <input type="text" class="form-input" placeholder="" v-model="accountName">
                <i class="form-icon" :class="{ 'loading': isLoading }"></i>
              </div>
              <div class="">
                &nbsp;
                <button class="btn btn-success btn-mod" v-bind:class="{ 'loading': isLoading }" type="submit">Add account</button>
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
      accountName: '',
    }
  },
  components: {
    CustomHeader, CustomFooter, Sidebar
  },
  methods: {
    add() {
      this.isLoading = true;
      this.errorMessage = null;
      axios.post('/api/account', {
        username: this.accountName,
      })
        .then((res) => {
          this.accountName = ''
          this.loginPassword = ''
          this.successMessage = 'Account added'
          this.isLoading = false
        })
        .catch((e) => {
          console.log(e)
          this.isLoading = false
          this.errorMessage = e.response.data.message ? e.response.data.message : 'There was an error'
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