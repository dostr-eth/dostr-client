<template>
  <div style="padding: 0.2rem 0.5rem 1rem" @click="closeSelects">
    <div v-if="Object.keys(preferences).length">
      <div
        v-if="editingPreferences"
        class="flex gt-sm"
        style="margin-left: 77%; gap: 0.2rem"
      >
        <q-btn
          label="save"
          color="positive"
          outline
          size="sm"
          @click="savePreferences"
        />
        <q-btn
          label="cancel"
          color="negative"
          outline
          size="sm"
          @click="cancel('preferences')"
        />
      </div>
      <div
        v-if="editingPreferences"
        class="flex lt-md"
        style="margin-left: 65%; gap: 0.2rem"
      >
        <q-btn
          label="save"
          color="positive"
          outline
          size="sm"
          @click="savePreferences"
        />
        <q-btn
          label="cancel"
          color="negative"
          outline
          size="sm"
          @click="cancel('preferences')"
        />
      </div>
      <div
        class="text-bold flex justify-between no-wrap spotnik"
        style="font-size: 1.1rem"
      >
        {{ $t("preferences") }}
        <div
          class="text-normal flex row no-wrap"
          style="font-size: 0.9rem; gap: 0.4rem"
        >
          <q-btn
            v-if="!editingPreferences"
            label="edit"
            color="primary"
            outline
            size="sm"
            @click="editingPreferences = true"
          />
        </div>
      </div>
      <div class="flex column q-px-sm" style="gap: 0.3rem; margin-top: 10px">
        <div
          class="text-bold flex justify-between no-wrap spotnik"
          style="font-size: 13px; color: skyblue"
        >
          {{ $t("colors") }}
        </div>
        <div
          v-if="preferences.color"
          style="padding-left: 0.2rem; gap: 1rem"
          class="flex row"
        >
          <div
            v-for="(colorName, index) in Object.keys(preferences.color)"
            :key="index"
            class="flex column items-center"
          >
            <label :for="colorName" style="font-size: 12px">{{
              colorName.toUpperCase()
            }}</label>
            <input
              type="color"
              :id="colorName"
              :name="colorName"
              :value="preferences.color[colorName]"
              :disabled="!editingPreferences"
              @input="(event) => updateColor(event.target.value, colorName)"
            />
          </div>
          <!-- <div v-for='(colorName, index) in Object.keys(preferences.color)' :key='index' class='flex column items-center'>
            <label :for="colorName">{{ colorName }}</label> -->
          <BaseSelect
            :allow-selection="editingPreferences"
            :selecting="choosingTheme"
            style="width: 200px"
            @toggle="choosingTheme = !choosingTheme"
          >
            <template #default>{{ "customise theme" }}</template>
            <template #list-items>
              <li
                v-for="(theme, index) in Object.keys(themes)"
                :key="index"
                @click.stop="updateTheme(themes[theme])"
              >
                <span>{{ theme }}</span>
              </li>
            </template>
          </BaseSelect>
          <!-- </div> -->
        </div>
        <!--
        <div class="text-bold flex justify-between no-wrap spotnik"
          style="font-size: 13px; margin-top: 10px; color: skyblue;">
          {{ $t("font") }}
        </div>
        <BaseSelect v-if="preferences.font" :allow-selection="editingPreferences" :selecting="choosingFont"
          style="width: 200px" @toggle="choosingFont = !choosingFont">
          <template #default>{{ preferences.font }}</template>
          <template #list-items>
            <li v-for="(font, index) in fonts" :key="index" class="font-item" @click.stop="updateFont(font)">
              <link :href="`https://fonts.googleapis.com/css2?family=${googleFontsName(
                font
              )}`" rel="stylesheet" />
              <span :style="`font-family: '${font}';`">{{ font }}</span>
            </li>
          </template>
        </BaseSelect>
        -->
        <div
          class="text-bold flex justify-between no-wrap spotnik"
          style="font-size: 13px; margin-top: 10px; color: skyblue"
        >
          {{ $t("Lightning Tips ⚡") }}
        </div>
        <div class="flex column q-px-sm" style="gap: 0.3rem">
          <div>
            OFF
            <q-toggle
              v-model="preferences.lightningTips.enabled"
              :disable="!editingPreferences"
              checked-icon="check"
              unchecked-icon="clear"
              color="yellow"
              keep-color
              size="sm"
            />
            ON
          </div>
          <span style="white-space: nowrap; font-size: 12px" class="spotnik"
            ><strong>tip presets</strong></span
          >
          <div
            v-if="preferences.lightningTips.enabled"
            class="flex row no-wrap items-center"
            style="gap: 2rem"
          >
            <q-input
              v-for="(preset, index) in preferences.lightningTips.presets"
              :key="index"
              v-model="preferences.lightningTips.presets[index]"
              type="number"
              :label="'default ' + (index + 1)"
              :disable="!editingPreferences"
              dense
              filled
              suffix="sats"
              input-class="sf-mono"
            />
          </div>
          <div v-if="hasWebLn" style="margin-top: 10px">
            <span
              style="white-space: nowrap; font-size: 12px; color: yellow"
              class="spotnik"
              ><strong>one-click tip</strong></span
            >
            <div style="font-size: 0.9rem; margin-top: 5px;">
              You will need a <span style="color: yellow;">webln</span> enabled wallet like <strong>Alby</strong>
              to use this
              feature, and setting a budget in your <span style="color: yellow;">webln</span> wallet for NOSTR will
              give you a true one-click experience. This will authorize a tip of
              a set default amount to the author of a note with one click of the
              <q-icon name="bolt" style="font-size: 1.5rem" /> <span style="color: yellow;">Lightning Tip</span>
              button. The
              <q-icon name="arrow_drop_down" style="font-size: 2rem" /> dropdown button to the left
              will take you through the normal <span style="color: yellow;">Lightning Tip</span> pay-flow.
            </div>
            <div
              v-if="preferences.lightningTips.enabled"
              class="flex row no-wrap items-center"
              style="gap: 2rem"
            >
              <div>
                OFF
                <q-toggle
                  v-model="preferences.lightningTips.oneClick.enabled"
                  :disable="!editingPreferences"
                  color="accent"
                  size="sm"
                />
                ON
              </div>
              <q-input
                v-if="preferences.lightningTips.oneClick.enabled"
                v-model="preferences.lightningTips.oneClick.amount"
                type="number"
                label="webln default tip"
                :disable="!editingPreferences"
                filled
                dense
                suffix="sats"
                style="width: 10rem; padding: 10px 5px 5px 5px; margin-top: 10px;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCssVar } from 'quasar'
import BaseSelect from 'components/BaseSelect.vue'

export default {
  name: 'Settings',
  emits: ['update-font'],
  components: {
    BaseSelect,
  },

  data() {
    return {
      editingPreferences: false,
      choosingFont: false,
      choosingTheme: false,
      preferences: {},
      hasJustSharedRelay: false,
      hasWebLn: false,
      themes: {
        dostr: {
          primary: '#d671ea',
          secondary: '#5af2e0',
          accent: '#ecc865',
          background: '#1f1f1f',
        },
        mono: {
          primary: '#ffffff',
          secondary: '#aaaaaa',
          accent: '#777777',
          background: '#1f1f1f',
        },
        'zen lisa frank': {
          primary: '#14c5d2',
          secondary: '#9c45f2',
          accent: '#f943c9',
          background: '#c7c7c7',
        },
        nostrich: {
          primary: '#ad09c3',
          secondary: '#57198a',
          accent: '#9c45f2',
          background: '#fbf5ff',
        },
        dusk: {
          primary: '#ff5100',
          secondary: '#b86bff',
          accent: '#8373ff',
          background: '#000082',
        },
        camo: {
          primary: '#67983e',
          secondary: '#686512',
          accent: '#030c06',
          background: '#c5c7b2',
        },
        warm: {
          primary: '#f07575',
          secondary: '#ffb042',
          accent: '#ead04d',
          background: '#756168',
        },
        cool: {
          primary: '#83eefc',
          secondary: '#42a4ff',
          accent: '#a27aff',
          background: '#4a4d59',
        },
        southwest: {
          primary: '#719f9f',
          secondary: '#d27014',
          accent: '#994a00',
          background: '#e8d9b0',
        },
        dracula: {
          primary: '#50fa7b',
          secondary: '#8be9fd',
          accent: '#6272a4',
          background: '#282a36',
        },
        poimandres: {
          primary: '#5de4c7',
          secondary: '#5fa3b4',
          accent: '#acd7ff',
          background: '#1c1e28',
        },
      },
      // fonts: ['Roboto', 'Open Sans', 'Noto Sans JP', 'Montserrat', 'Lato', 'Poppins', 'Roboto Condensed', 'Source Sans Pro', 'Oswald', 'Roboto Mono']
      fonts: [
        'Roboto',
        'Open Sans',
        'Noto Sans JP',
        'Montserrat',
        'Lato',
        'Poppins',
        'Roboto Condensed',
        'Source Sans Pro',
        'Oswald',
        'Roboto Mono',
        'Raleway',
        'Inter',
        'Noto Sans',
        'Ubuntu',
        'Nunito',
        'Roboto Slab',
        'Nunito Sans',
        'Playfair Display',
        'Merriweather',
        'PT Sans',
        'Rubik',
        'Noto Sans KR',
        'Mukta',
        'Lora',
        'Kanit',
        'Work Sans',
        'Fira Sans',
        'Barlow',
        'Noto Sans TC',
        'Nanum Gothic',
        'Mulish',
        'Quicksand',
        'Titillium Web',
        'PT Serif',
        'Hind Siliguri',
        'Heebo',
        'Libre Franklin',
        'DM Sans',
        'Noto Serif',
        'IBM Plex Sans',
        'Karla',
        'Josefin Sans',
        'Arimo',
        'Oxygen',
        'Dosis',
        'Inconsolata',
        'Libre Baskerville',
        'Anton',
        'Manrope',
        'Cairo',
        'PT Sans Narrow',
        'Secular One',
        'Signika Negative',
        'Source Serif Pro',
        'Bebas Neue',
        'Bitter',
        'Cabin',
        'Dancing Script',
        'Abel',
        'Hind',
        'Barlow Condensed',
        'Source Code Pro',
        'Prompt',
        'EB Garamond',
        'Lobster',
        'Varela Round',
        'Comfortaa',
        'Exo 2',
        'Fjalla One',
        'Pacifico',
        'Crimson Text',
        'Noto Sans SC',
        'Noto Serif JP',
        'Slabo 27px',
        'Maven Pro',
        'Teko',
        'Asap',
        'Overpass',
        'Archivo',
        'Caveat',
        'Arvo',
        'Jost',
        'Merriweather Sans',
        'Shadows Into Light',
        'Abril Fatface',
        'Assistant',
        'Public Sans',
        'M PLUS Rounded 1c',
        'Rajdhani',
        'Tajawal',
        'Space Grotesk',
        'Cormorant Garamond',
        'Yanone Kaffeesatz',
        'Saira Condensed',
        'Catamaran',
        'Questrial',
        'Hind Madurai',
        'Indie Flower',
        'Fira Sans Condensed',
        'IBM Plex Serif',
        'Noto Sans HK',
        'Alfa Slab One',
        'Barlow Semi Condensed',
        'Zilla Slab',
        'Red Hat Display',
        'IBM Plex Mono',
        'M PLUS 1p',
        'Play',
        'Exo',
        'Patrick Hand',
        'Nanum Myeongjo',
        'Domine',
        'Signika',
        'Chakra Petch',
        'Satisfy',
        'Permanent Marker',
        'Acme',
        'Fredoka One',
        'Archivo Narrow',
        'Sarabun',
        'Bree Serif',
        'Amatic SC',
        'Noto Sans Arabic',
        'Alegreya Sans',
        'Righteous',
        'Russo One',
        'Alegreya',
        'Vollkorn',
        'Didact Gothic',
        'ABeeZee',
        'Almarai',
        'Archivo Black',
        'Cinzel',
        'Baloo 2',
        'Encode Sans',
        'Kalam',
        'Frank Ruhl Libre',
        'Changa',
        'Tinos',
        'Yantramanav',
        'DM Serif Display',
        'Noto Serif TC',
        'Asap Condensed',
        'Amiri',
        'Crete Round',
        'Ubuntu Condensed',
        'Lobster Two',
        'Martel',
        'Spectral',
        'Noto Kufi Arabic',
        'Cormorant',
        'Courgette',
        'Patua One',
        'Passion One',
        'Alata',
        'Space Mono',
        'Great Vibes',
        'Cardo',
        'Prata',
        'Rokkitt',
        'Sora',
        'Fira Sans Extra Condensed',
        'Ropa Sans',
        'Noticia Text',
        'Francois One',
        'Old Standard TT',
        'Michroma',
        'IBM Plex Sans Arabic',
        'PT Sans Caption',
        'Montserrat Alternates',
        'Orbitron',
        'Kaushan Script',
        'Saira',
        'Faustina',
        'Concert One',
        'Antic Slab',
        'Noto Sans Display',
        'Yellowtail',
        'Unna',
        'Chivo',
        'Marcellus',
        'Gelasio',
        'Covered By Your Grace',
        'Gothic A1',
        'Crimson Pro',
        'Sawarabi Mincho',
        'Urbanist',
        'Carter One',
        'Cookie',
        'Gloria Hallelujah',
        'Pathway Gothic One',
        'Mali',
        'Rubik Mono One',
        'Lexend Deca',
        'Press Start 2P',
        'News Cycle',
        'Sacramento',
        'Quattrocento Sans',
        'Philosopher',
      ],
    }
  },

  mounted() {
    this.clonePreferences()
    this.hasWebLn = window.webln
  },

  methods: {
    clonePreferences() {
      this.preferences = JSON.parse(
        JSON.stringify(this.$store.state.config.preferences)
      )
    },
    savePreferences() {
      this.$store.commit('setConfig', {
        key: 'preferences',
        value: this.preferences,
      })
      this.editingPreferences = false
    },
    updateColor(color, colorName) {
      setCssVar(colorName, color)
      this.preferences.color[colorName] = color
      if (colorName === 'background')
        this.$q.dark.set(this.lightOrDark(color) === 'dark')
    },
    updateTheme(theme) {
      for (let colorName of Object.keys(theme))
        this.updateColor(theme[colorName], colorName)
    },
    updateFont(font) {
      this.preferences.font = font
      this.$emit('update-font', font)
    },
    capitalise(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    cancel(section) {
      if (section === 'preferences') {
        this.editingPreferences = false
        this.clonePreferences()
        for (let [colorName, color] of Object.entries(this.preferences.color))
          this.updateColor(color, colorName)
        this.updateFont(this.preferences.font)
        return
      }
    },
    lightOrDark(color) {
      // Variables for red, green, blue values
      var r, g, b, hsp

      // Check the format of the color, HEX or RGB?
      if (color.match(/^rgb/)) {
        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(
          /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
        )

        r = color[1]
        g = color[2]
        b = color[3]
      } else {
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +(
          '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
        )

        r = color >> 16
        g = (color >> 8) & 255
        b = color & 255
      }

      // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
      hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

      // Using the HSP value, determine whether the color is light or dark
      if (hsp > 127.5) {
        return 'light'
      } else {
        return 'dark'
      }
    },
    googleFontsName(font) {
      try {
        return font.replace(' ', '+')
      } catch (e) {
        console.log('error for font ', font)
      }
    },
    closeSelects(e) {
      this.choosingFont = false
      this.choosingTheme = false
    },
  },
}
</script>

<style lang="css" scoped>
.section {
  padding: 0.5rem;
}
</style>
