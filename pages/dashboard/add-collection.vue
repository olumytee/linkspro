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
      <custom-header title="Add collection"></custom-header>
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="columns">
              <div class="column col-6 col-md-12">
                <p>
                  *This should ideally be your instagram username. For example if your instagram username is 'beyonce', you should enter 'beyonce' below so that you can get the bio link
                  <a href="#">mycoo.link/beyonce</a>
                </p>
              </div>
            </div>
            <p class="text-error" v-if="errorMessage">{{errorMessage}}</p>
            <p class="text-success" v-if="successMessage">{{successMessage}}</p>
            <form class="" v-on:submit.prevent="add">
              <div class="columns">
                <div class="column col-2 col-md-12 small-margin">
                  <label class="form-label" for="input-example-1">Collection name</label>
                </div>
                <div class="column col-4 col-md-12 has-icon-right small-margin">
                  <input type="text" class="form-input" placeholder="" v-model="collectionName" required>
                  <i class="form-icon" :class="{ 'loading': isLoading }"></i>
                </div>
                <div class="column col-2 col-md-12 small-margin">
                  <button class="btn btn-success btn-mod" v-bind:class="{ 'loading': isLoading }" type="submit">Add collection</button>
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
import axios from 'axios';
import CustomHeader from '@/components/headerIn';
import CustomFooter from '@/components/footer';
import Sidebar from '@/components/sidebar';

export default {
  middleware: 'auth',
  data() {
    return {
      errorMessage: null,
      successMessage: null,
      isLoading: false,
      isAvailable: false,
      collectionName: ''
    };
  },
  components: {
    CustomHeader,
    CustomFooter,
    Sidebar
  },
  methods: {
    add() {
      const regex = new RegExp(/^(dashboard|collection|settings|api)$/i);
      if (regex.test(this.collectionName)) {
        this.errorMessage = 'Invalid collection Name';
        return;
      } else {
        this.isLoading = true;
        this.errorMessage = null;
        axios
          .post('/api/collection', {
            username: this.collectionName
          })
          .then(res => {
            this.collectionName = '';
            this.loginPassword = '';
            this.successMessage = 'Collection added';
            this.isLoading = false;
          })
          .catch(e => {
            console.log(e);
            this.isLoading = false;
            this.errorMessage = e.response.data.message
              ? e.response.data.message
              : 'There was an error';
          });
      }
    }
  }
};
</script>
<style scoped>
.off-canvas .off-canvas-sidebar {
  padding: 0rem;
}

.off-canvas-body {
  min-width: 100%;
}

.container {
  padding-left: 1em;
  padding-right: 1em;
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
  .small-margin {
    margin-bottom: 4px;
  }
}
</style>