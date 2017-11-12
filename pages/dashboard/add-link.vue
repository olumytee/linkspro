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
      <custom-header title="Add link"></custom-header>
      <div class="container">
        <div class="columns">
          <div class="column">
            <p class="text-error" v-if="errorMessage">{{errorMessage}}</p>
            <p class="text-success" v-if="successMessage">{{successMessage}}</p>
            <form v-on:submit.prevent="initadd" v-if="!meta">
              <div class="columns">
                <div class="column col-6 col-xs-12">
                  <div class="form-group">
                    <label class="form-label" for="input-example-1">URL</label>
                    <input class="form-input" type="url" id="input-example-1" placeholder="http://google.com" v-model="link">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="input-example-2">Collection</label>
                    <select class="form-select" id="input-example-2" v-model="collection">
                      <option disabled value="">Choose a collection</option>
                      <option v-for="i in $store.state.collectionsTable" :value="i.collectionName" :key="i.collectionName">{{i.collectionName}}</option>
                    </select>
                  </div>
                  <div class="form-group">
                   <button class="btn btn-success btn-mod" v-bind:class="{ 'loading': isLoading }" type="submit">Add link</button>
                  </div>  
                </div>
              </div>
            </form>
            <form v-on:submit.prevent="add" v-if="meta">
              <div class="columns">
                <div class="column col-6 col-xs-12">
                  <div class="form-group">
                    <label class="form-label" for="input-example-1">URL</label>
                    <input class="form-input" type="url" id="input-example-1" placeholder="http://google.com" v-model="link">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="input-example-2">Collection</label>
                    <select class="form-select" id="input-example-2" v-model="collection">
                      <option disabled value="">Choose a collection</option>
                      <option v-for="i in $store.state.collectionsTable" :value="i.collectionName" :key="i.collectionName">{{i.collectionName}}</option>
                    </select>
                  </div>
                  <div class="form-group" v-if="meta">
                    <label class="form-label" for="input-example-1">Title</label>
                    <input class="form-input" type="text" id="input-example-1" placeholder="Google Home" v-model="meta.title">
                  </div>
                  <div class="form-group" v-if="meta">
                    <label class="form-label" for="input-example-1">Description</label>
                    <input class="form-input" type="text" id="input-example-1" placeholder="http://google.com" v-model="meta.description">
                  </div>
                  <div class="form-group" v-if="meta">
                    <label class="form-label" for="input-example-1">Image</label>
                    <input class="form-input" type="url" id="input-example-1" placeholder="http://google.com" v-model="meta.image">
                  </div>
                  <div class="form-group">
                   <button class="btn btn-success btn-mod" v-bind:class="{ 'loading': isLoading }" type="submit">Add link</button>
                  </div>  
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
      link: '',
      meta: null,
      collection: ''
    };
  },
  mounted() {
    this.initData();
  },
  components: {
    CustomHeader,
    CustomFooter,
    Sidebar
  },
  methods: {
    initadd() {
      this.isLoading = true;
      this.errorMessage = null;
      axios
        .post('/api/initlink', {
          url: this.link,
          collection: this.collection
        })
        .then(res => {
          this.meta = res.data;
          this.successMessage = 'Data fetched';
          this.isLoading = false;
        })
        .catch(e => {
          this.isLoading = false;
          this.errorMessage = e.response.data.message
            ? e.response.data.message
            : 'There was an error';
        });
    },
    add() {
      this.isLoading = true;
      this.errorMessage = null;
      axios
        .post('/api/link', {
          url: this.link,
          meta: this.meta,
          collection: this.collection
        })
        .then(res => {
          this.link = this.meta = this.collection = null;
          this.successMessage = 'Link added';
          this.isLoading = false;
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
          this.errorMessage = e.response.data.message
            ? e.response.data.message
            : 'There was an error';
        });
    },
    initData() {
      this.$store
        .dispatch('load_dashboard')
        .then(res => {
          console.log('done');
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        });
    }
  }
};
</script>
<style scoped>
.btn-mod {
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 1.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
  line-height: 1.5;
  padding: 0.5em, 2em;
  border: none;
  background: #a78bde;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14), 0 2px 8px 0 rgba(0, 0, 0, 0.14);
  border-radius: 6px;
  transition: 0.5s;
}
.btn-mod:hover {
  background: #ffffff;  
  color: #a78bde;
  text-shadow: none;
  box-shadow: 0 2px 16spx 0 rgba(0, 0, 0, 0.2);
}
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