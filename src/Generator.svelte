<script lang="ts">
  import { APIKey } from './lib/store';
  import { generateTweet } from './lib/openai';
  let situation: string = '';
  let tweetresult: string = '';
  let tweetresultblank: string = '';
  let running,
    error,
    done = false;

  const run = async (situation: string) => {
    running = true;
    error = false;
    done = false;
    const result = await generateTweet(situation);
    if (result.status == 200) {
      const baseResult = result.data.choices[0].message.content;
      const resultArray = baseResult.split(' ');
      const applyBlueColorOnHashtag = resultArray.map((word) => {
        if (word.startsWith('#')) {
          if (word.endsWith('"')) {
            word = word.slice(0, -1);
          }
          return `<span style="color: #93c6cf">${word}</span>`;
        }
        return word;
      });
      tweetresult = applyBlueColorOnHashtag.join(' ');
      if (tweetresult.startsWith('"')) {
        tweetresult = tweetresult.slice(1);
      }
      tweetresultblank = baseResult;
      done = true;
    } else {
      error = true;
      console.log(result);
    }
    running = false;
  };

  const reset = () => {
    situation = '';
    tweetresult = '';
    tweetresultblank = '';
    running = false;
    error = false;
    done = false;
  };
</script>

{#if $APIKey != ''}
  {#if !running && !done}
    <h3>Décrivez une situation. ✏️</h3>
    <textarea
      style="resize: none"
      minlength="10"
      maxlength="200"
      rows="2"
      placeholder="Une personne essaye de générer un tweet aigri à partir d'un générateur."
      bind:value={situation}
    />
    ({situation.length}/200{`${
      situation.length > 9 ? '' : ' - 10 caractères minimum.'
    }`})
    {#if situation.length > 9}
      <button on:click={() => run(situation)} disabled={running}>Générer</button
      >
    {/if}
  {/if}
  {#if running}
    <h3>En cours... ⌛</h3>
  {/if}
  {#if error}
    <h3>Une erreur est survenue. 😓</h3>
    <p>
      Peut-être est ce dû à une clé API invalide, ou alors le serveur est en
      maintenance. Regardez la console pour plus d'informations.
    </p>
  {/if}
  {#if done}
    <h3>Voici votre tweet ! 🫠</h3>
    <blockquote>{@html tweetresult}</blockquote>
    <p>
      ♻️ <a href="#_" on:click={() => run(situation)}
        >Générer un autre tweet avec la même situation</a
      >
    </p>
    <p>
      🤣 <a
        href="https://twitter.com/intent/tweet?text={tweetresultblank}"
        target="_blank"
        rel="noopener noreferrer">Partager ce tweet sur twitter</a
      >
    </p>
    <p>
      ✏️ <a href="#_" on:click={reset}>Recommencer</a>
    </p>
  {/if}
{/if}
