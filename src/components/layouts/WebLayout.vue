<template>
  <div class="web-container">
    <header>
      <Header />
    </header>
    <aside>
      <MenuSider />
    </aside>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
<script>
import Header from "./WebHeader";
import Footer from "./WebFooter";
import MenuSider from "./MenuSider";
export default {
  name: "WebLayout",
  components: {
    Header,
    Footer,
    MenuSider
  }
};
</script>