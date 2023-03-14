<script lang="ts">
  import { APIKey } from './store';
  const setKey = () => {
    const key = prompt('Entrez votre clé API');
    if (key) {
      APIKey.set(key);
    }
  };

  const reset = () => {
    APIKey.set('');
  };
</script>

{#if !$APIKey}
  <div>
    <button on:click={setKey}>Renseigner sa clé API</button>
    <a
      href="https://www.brainsorting.dev/posts/creer-un-compte-openai-et-obtenir-sa-cle-api/"
      target="_blank"
      rel="noopener noreferrer">Comment obtenir sa clé API ?</a
    >
  </div>
{:else}
  <div>
    Vous avez déjà renseigné une clé API,
    <a on:click={reset} class="resetLink" href="#_">la changer ?</a>
  </div>
{/if}

<style>
  .resetLink {
    cursor: pointer;
  }
</style>
