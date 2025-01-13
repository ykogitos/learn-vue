<script setup lang="ts">
import TheSlider from '@/components/TheSlider.vue'
import { ref } from 'vue'

const toggled = ref(false)
const toggledButton = () => (toggled.value = !toggled.value)
</script>

<template>
  <main>
    <TheSlider>
      <p>Inside the slider</p>
      <p>More information here</p>
      <p>More information here</p>
      <p>More information here</p>
    </TheSlider>
    <section style="max-width: 680px; margin: auto; text-align: justify; padding-top: 2.5rem">
      Toggled: {{ toggled }}
      <button class="button" @click="toggledButton">Plus d'information</button>
      <transition>
        <div v-if="toggled">
          <p>
            Avec <u>Esna</u> et <strong>Edfou</strong>, Kom Ombo est le troisième arrêt majeur de la
            plupart des croisières sur le Nil entre Louxor et Assouan. Situé près de 50 kms au nord
            d'Assouan, la visite du temple peut facilement se faire au cours d'une excursion d'une
            journée. Toutefois, le cadre de ce Temple de Sobek, le Dieu crocodile, situé sur la rive
            est du Nil, rend l'arrivée en bateau impressionnante. Le Temple est posé sur une colline
            pittoresque le long de la rive du fleuve et bien qu'il n'y ait plus de crocodile
            aujourd'hui dans le Nil ou dans le lac sacré du temple, il mérite une visite.
          </p>

          <p>
            Le temple de Sobek et d'Haroëris situé à Kôm Ombo, à 165 kms au sud de Louxor, est le
            temple égyptien dédié au culte des dieux Sobek et Haroëris. Partiellement ruiné, il est
            actuellement le seul vestige visible. Comme les autres sites entre Louxor et Assouan,
            Kom Ombo date de la dynastie ptolémaïque et fut achevé sous le règne des Romains.
            Ptolémée VI (-180/-145) fut à l'origine de la construction, au début de son règne. La
            construction du temple continua avec d'autres Ptolémées dont Ptolémée XIII (-47/-44) et
            s'acheva au IIIème siècle. Fait inhabituel, il était dédié au culte de deux divinités
            vénérées sur un pied d'égalité : Haroëris, ou Horus, le dieu à tête d'épervier et Sobek,
            le dieu crocodile, c'est pourquoi il est appelé le « temple aux deux divinités ». Le
            temple entier, symétrique le long de son axe principal, est donc séparé en deux parties,
            celle du nord, consacrée à Haroéris et celle du sud à Sobek. Comme à Esna, l'entrée sous
            porche, marquée par des pylônes, n'existe plus, la salle hypostyle est aujourd'hui le
            plus impressionnant vestige du site. Sur le site, le Musée du dieu-crocodile, exposant
            de nombreuses momies de crocodiles, intéressera petits et grands.
          </p>
        </div>
      </transition>
    </section>
  </main>
</template>

<style lang="scss" scoped>
div {
  transition: 0.5s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
