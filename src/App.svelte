<script lang="ts">
  import ApiButton from './lib/APIButton.svelte';
  import Generator from './Generator.svelte';
</script>

<h1>Twittris 🐥</h1>
<p>Générateur de tweets aigri.</p>

<h3>Qu'est ce que Twittris ? 🤨</h3>
<p>
  Twittris est un générateur de faux tweets aigri à l'aide du model d'IA qui se
  base sur ChatGPT dans un but purement humoristique.
</p>

<h3>Comment ça marche ? 🤔</h3>
<p>
  Premièrement, vous allez devoir indiquer en cliquant sur ce bouton si dessous
  une clé API d'OpenAI. Etant donné que le service est payant, je ne peux pas
  fournir ce service sans clé.
</p>

<ApiButton />

<p>
  Ensuite, il suffit de donner une situation et de cliquer sur le bouton, l'IA
  va générer automatiquement un tweet basé sur la situation.
</p>

<Generator />

<h6>
  Made with 💜 by <a
    href="https://herisdia.me"
    target="_blank"
    rel="noopener noreferrer">Herisdia</a
  >.
</h6>
