<template>
  <div class="about">
    <v-app-bar app color="teal" dark>
      <v-btn class="d-lg-none" icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>About</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <v-layout column wrap>
          <h1 class="text-center my-2">Lorem Ipsum</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus eros lacus, vitae consectetur nulla vehicula sit amet. Etiam auctor erat quis feugiat molestie. Quisque dolor felis, vehicula sit amet lacinia ornare, feugiat in est. Sed a porta dolor, eget scelerisque neque. Vivamus in ante vehicula, sollicitudin risus condimentum, tempus purus. Vivamus lobortis odio in mi vulputate, ut posuere ipsum porttitor. Nam dictum, nulla ac varius luctus, mauris tellus pulvinar odio, at interdum nibh dolor vitae enim. Suspendisse vehicula diam leo, eu dapibus arcu malesuada vel. In gravida, orci eget imperdiet pellentesque, nisl nisl euismod dui, vitae convallis tellus diam ut libero.</p>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tincidunt tempor dui, eget hendrerit orci placerat sit amet. Aenean blandit, sapien ut ullamcorper scelerisque, sem orci finibus sem, eget sollicitudin tellus risus eu lorem. Curabitur vel tortor vel turpis tincidunt posuere. Vestibulum eget malesuada metus. Phasellus eu porta ante, eu eleifend nisi. Vivamus tincidunt eu elit ut hendrerit. Fusce suscipit ornare fringilla. Nam fringilla velit et ornare eleifend. Maecenas eleifend odio turpis, id sodales neque sagittis consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In laoreet sapien sed lacus posuere, quis porttitor felis consectetur. Suspendisse et nisl odio. Curabitur pretium viverra ullamcorper. Praesent auctor felis ut pharetra tristique. Morbi cursus commodo quam eu sagittis.</p>
          <p>Vestibulum sed magna ipsum. Duis finibus ornare lorem, non pellentesque tortor facilisis ut. Praesent non quam vulputate, pretium eros eu, cursus elit. Ut sed aliquet mauris. Sed molestie ultricies orci a pharetra. Nulla viverra facilisis velit at auctor. Etiam commodo vel massa eget convallis. Nullam placerat dictum dapibus. Maecenas eget fermentum nisi. Duis nec nibh congue, pulvinar lectus in, venenatis augue. Duis eu turpis a neque malesuada fermentum nec vel orci. Aliquam id fringilla turpis, vitae mollis tortor. Phasellus eget enim diam.</p>
          <p>Curabitur fermentum, erat id vestibulum convallis, nulla urna dapibus urna, nec placerat urna magna vel lorem. Pellentesque ac mi quis lectus vulputate lobortis hendrerit at leo. Aliquam erat volutpat. Maecenas tincidunt dictum nisi, at rhoncus nisi posuere in. Curabitur velit magna, malesuada et lacus et, aliquam rhoncus metus. Nullam justo mauris, pharetra non consequat id, vestibulum quis velit. Phasellus sed imperdiet tortor, nec lacinia dolor. Nullam suscipit velit enim, non sollicitudin ligula aliquam vel. Nam velit velit, rhoncus sit amet pharetra et, gravida consequat mauris. Suspendisse pulvinar ligula id nibh porta pharetra. Nulla est arcu, fringilla id enim ac, facilisis elementum nisl. Aliquam sollicitudin massa augue, at rutrum nisi ullamcorper ac.</p>
          <p>Vivamus id felis id quam malesuada aliquam. Nam purus mi, tempus non commodo non, aliquet id purus. Duis a enim id elit consectetur ullamcorper. Sed faucibus ipsum sed laoreet tincidunt. Praesent sagittis mauris eu elit euismod, et pulvinar nisi placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris egestas euismod magna non dapibus. Nunc sit amet feugiat odio, id pellentesque leo. Vivamus mi magna, tempor in velit vitae, dictum placerat orci. Pellentesque mattis ut est eu faucibus. Nulla dictum congue leo id faucibus. Sed eleifend velit sed ante elementum dignissim. Phasellus viverra, mi eu hendrerit imperdiet, lacus arcu luctus justo, eu maximus massa turpis molestie mauris. Fusce sed euismod quam. Cras mi nisl, consectetur at sollicitudin ut, maximus a odio.</p>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>

</style>
