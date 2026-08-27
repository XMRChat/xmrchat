<script setup lang="ts"></script>

<template>
  <div class="m-4">
    <div class="guide inner">
      <h4 class="title">{{ $t("walletGuides") }}</h4>
      <div class="page">
        <div class="how-to">
          <p>
            {{ $t("howToFindPrimaryAddress") }}
          </p>
          <h5>{{ $t("cakeWallet.title") }}</h5>
          <h6>
            <UIcon name="i-mdi-arrow-right-thin" class="text-3xl" />
            {{ $t("toGetYourPrimaryAddress") }}
          </h6>
          <ul>
            <li>{{ $t("cakeWallet.primaryAddress1") }}</li>
            <li>{{ $t("cakeWallet.primaryAddress2") }}</li>
          </ul>

          <h6>
            <UIcon name="i-mdi-arrow-right-thin" class="text-3xl" />
            {{ $t("toGetYourViewKey") }}
          </h6>
          <ul>
            <li>
              {{ $t("cakeWallet.viewKey1") }}
              <span class="text-orange-500">-></span>
              {{ $t("cakeWallet.securityAndBackup") }}
              <span class="text-orange-500">-></span>
              {{ $t("cakeWallet.showSeed") }}
            </li>
            <li>{{ $t("cakeWallet.viewKey2") }}</li>
          </ul>
        </div>
        <div class="images">
          <div>
            <img
              class="rounded-xl"
              src="/images/kuno_view_key_cake.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="guide inner">
      <div class="page">
        <div class="how-to">
          <h5>{{ $t("GUIWallet.title") }}</h5>
          <ul>
            <li>
              {{ $t("GUIWallet.guide1") }}
              <span class="text-orange-500">-></span>
              {{ $t("GUIWallet.seedsAndKeys") }}
            </li>
            <li>{{ $t("GUIWallet.guide2") }}</li>
          </ul>
        </div>
        <div class="images">
          <div>
            <img
              class="rounded-xl"
              src="/images/kuno_view_key_gui.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="guide inner">
      <div class="page">
        <div class="how-to">
          <h5>{{ $t("featherWallet.title") }}</h5>
          <ul>
            <li>
              {{ $t("featherWallet.guide1") }}
              <span class="text-orange-500">-></span>
              {{ $t("featherWallet.keys") }}
            </li>
            <li>{{ $t("featherWallet.guide2") }}</li>
          </ul>
        </div>
        <div class="images">
          <div>
            <img
              class="rounded-xl"
              src="/images/kuno_view_key_feather.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="guide inner">
      <div class="page">
        <div class="how-to">
          <h5>{{ $t("monerujoWallet.title") }}</h5>
          <ul>
            <li>
              {{ $t("monerujoWallet.guide1") }}
              <span class="text-orange-500">-></span>
              {{ $t("monerujoWallet.clickOnTheMenu") }}
              <UIcon name="mdi:dots-vertical" />
              <span class="text-orange-500">-></span>
              {{ $t("monerujoWallet.selectShowSecrets") }}
            </li>
            <li>{{ $t("monerujoWallet.guide2") }}</li>
            <li>
              {{ $t("monerujoWallet.guide3") }}
              <span class="text-orange-500">-></span>
              {{ $t("monerujoWallet.copyViewKey") }}
            </li>
          </ul>
        </div>
        <div class="images">
          <div>
            <img
              class="rounded-xl"
              src="/images/view_key_monerujo.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.guide {
  @apply p-8 bg-background-2 shadow-md rounded-xl mt-10;
  .title {
    @apply font-bold text-4xl mb-5 border-b border-border pb-4;
  }
}
.page {
  @apply flex gap-8  justify-between;
  .how-to {
    @apply w-[60%] flex flex-col gap-4;
    p {
      @apply text-lg;
    }
    h5 {
      @apply font-bold text-xl;
    }
    h6 {
      @apply text-lg text-pale flex items-center gap-1;
    }
    ul {
      @apply flex gap-3 flex-col;
      li {
        @apply bg-background py-4 px-6 border-border border rounded-lg text-lg;
      }
    }
  }
  .images {
    @apply w-[40%] flex justify-end;
  }
}
@media screen and (max-width: 768px) {
  .guide {
    @apply p-5;
  }
  .page {
    @apply flex gap-8 flex-col;
    .how-to {
      ul {
        @apply flex gap-3 flex-col;
        li {
          @apply text-base;
        }
      }
    }

    .how-to,
    .images {
      @apply w-full;
    }
    .images {
      justify-content: center;
    }
  }
}
</style>
