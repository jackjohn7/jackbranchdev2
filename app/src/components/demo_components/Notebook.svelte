
<script lang="ts">
  import hljs from "highlightjs";
  const { highlight, getLanguage } = hljs;
  import { marked } from "marked";
  import { defaultNote } from "./notebookdata";

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const language = getLanguage(lang) ? lang : "plaintext";
      return highlight(language, code).value;
    },
    langPrefix: "hljs language-",
  });
  let tab: string = "raw";
  let note: string = defaultNote;
  $: preview = note != null ? marked.parse(note!) : "";
  $: rows = note != null ? countLines(note!) : 1;
  const countLines = (input: string) => {
    return input.split("\n").length + 1;
  };
</script>

<div class="flex flex-col px-4">
  <!-- heading -->
  <h1 class="dark:text-white text-3xl pb-2">Example Note</h1>
  <!-- navigation and actions -->
  <div class="select-none flex flex-row justify-between">
    <!-- Navigation -->
    <div class="flex flex-row space-x-2">
      <a class="bg-gray-200 rounded-lg px-2 py-1" href="/demos">Back</a>
      <button
        class="px-2 {tab === 'raw'
          ? 'bg-blue-500 rounded-t-lg text-white'
          : 'dark:text-white'}"
        on:click={() => (tab = "raw")}>Editor</button
      >
      <button
        class="px-2 {tab == 'md-preview'
          ? 'bg-blue-500 rounded-t-lg text-white'
          : 'dark:text-white'}"
        on:click={() => (tab = "md-preview")}>Preview</button
      >
    </div>
    <!-- Actions -->
    <div>
      <!-- In the future, this would ideally be done automatically following changes made to the text -->
      <button
        disabled={true}
        class="rounded-lg py-1 px-2 disabled:bg-gray-200 disabled:text-black disabled:dark:text-white text-white bg-blue-500 disabled:dark:bg-slate-700 disabled:opacity-20"
        type="submit"
        form="note-content">Save</button
      >
    </div>
  </div>
  {#if tab === "raw"}
    <form id="note-content">
      <textarea
        placeholder="# Awesome heading"
        name="content"
        {rows}
        class="bg-gray-100 dark:bg-slate-800 rounded-xl px-2 dark:text-white w-full"
        bind:value={note}
      />
    </form>
  {/if}
  {#if tab === "md-preview"}
    <article
      class="prose dark:prose-invert font-sans dark:text-white max-w-none pt-2 sm:px-8"
    >
      {@html preview}
      {#if preview.trim() == ""}
        <h1>Nothing here yet!</h1>
        <p>Use the editor to type some markdown</p>
        <a href="https://www.markdownguide.org/basic-syntax/">Syntax</a>
      {/if}
    </article>
  {/if}
</div>
