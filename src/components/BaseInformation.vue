<template>
  <div style='border: 1px solid #b6c6e39f; border-radius: 5px;'>
    <q-expansion-item dense dense-toggle group='info' class="no-padding full-width" header-class='items-center'>
      <template #header>
        <span class='full-width text-bold text-uppercase text-head'>What is Dostr?</span>
      </template>
      <q-card-section class='tight-text'>
        <p>
          The <a href='https://github.com/dostr-eth' target='_blank' rel='noopener noreferrer'>Dostr protocol</a>, or
          simply Dostr, is an
          Ethereum-flavoured
          Nostr client. Similar to Nostr, Dostr is an <b>open</b>,
          <b>permissionless</b>, <b>censorship-resistant</b> and
          <b>distributed</b> information network that relies on <b>Clients</b> and <b>Relays</b>. Both have their assigned
          duties:
          relays store user data and clients communicate with the relays to save and fetch the said user data.
        </p>
        <ul>
          <li>Users choose which relays to store their data on, meaning no single centralized entity has enforcable
            authority
            to remove your data from the network. Thus, it is recommended to use multiple relays.</li>
          <li>Users choose which clients to use to interact with Nostr, meaning no single centralized website can stop you
            from accessing the
            network.</li>
          <li>Any Nostr client can be used with any Nostr relay, meaning users can choose their relays and client
            independently. This also applies to Dostr.</li>
        </ul>
        <p>
          Dostr client provides an optional feature for users to login with Ethereum wallets. Dostr
          accomplishes this by generating new Nostr user keys from users' Ethereum signatures. This essentially means that
          users can now <b>Sign-In With Ethereum (SIWE)</b> to access their Nostr profiles and even use their
          decentralised
          Ethereum identity such as ENS. You can read the <a
href='https://github.com/dostr-eth/resources' target='_blank'
            rel='noopener noreferrer'><b>full Dostr specs</b></a> here.
        </p>
      </q-card-section>
    </q-expansion-item>
    <div style='max-height: 0; border-top: 1px solid #b6c6e39f' />
    <q-expansion-item dense dense-toggle group='info' class="no-padding full-width" header-class='items-center'>
      <template #header>
        <span class='full-width text-bold text-uppercase'>Do I need a keypair?</span>
      </template>
      <q-card-section class='tight-text'>
        <p>
          A keypair is simply a cryptographic identifier which is only required to create your profile on Nostr network.
          If you simply wish to explore
          Nostr
          without logging in, you do not need a keypair. Simply close this dialog box and off you go into the wild.
        </p>
        <p>
          If you decide to login at a later stage, simply hit the <b>LOGIN</b> <q-icon name='login' />
          button in the user menu. Hitting this button will provide you with several keypair generation options to choose
          from.
        </p>
      </q-card-section>
    </q-expansion-item>
    <div style='max-height: 0; border-top: 1px solid #b6c6e39f' />
    <q-expansion-item dense dense-toggle group='info' class="no-padding full-width" header-class='items-center'>
      <!-- <div class='flex row justify-between'> -->
      <template #header>
        <span class='full-width text-bold text-uppercase'>What is a keypair?</span>
      </template>
      <q-card-section class='tight-text'>
        A keypair is a cryptographic identifier necessary to participate in the Nostr network; it consists of a <b
          style="color: lightgreen;">Public Key</b>
        and a <b style="color: orange;">Private Key</b>.
        This keypair can be used in any Nostr client to login.
        <q-list bordered padding class="q-mt-sm q-mb-sm" style="border-radius: 4px;">
          <q-item>
            <q-item-section class='tight-text'>
              <q-item-label><b style="color: lightgreen;">Public Key</b></q-item-label>
              <q-item-label style="font-size: 14px;">
                It is a publicly known unique identifier associated with your account on the Nostr
                network. It can be shared freely and others can see your posts or
                follow you using your public key. It is similar to a username.
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class='tight-text'>
              <q-item-label><b style="color: orange;">Private Key</b></q-item-label>
              <q-item-label style="font-size: 14px;">
                <strong>KEEP THIS SECRET!</strong> Private key is similar to a password and must be kept secret. If
                a bad actor gets unauthorised access to your private key, they can impersonate you on Nostr network and
                see your encrypted private messages.
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <p>
          Your <b style="color: orange;">private key</b> is cryptographically bound to your <b
            style="color: lightgreen;">public key</b> although it
          is not possible derive your <b style="color: orange;">private key</b> from <b style="color: lightgreen;">public
            key</b>. The inverse is however possible, i.e. your <b style="color: lightgreen;">public key</b> can be
          cryptographically derived from your <b style="color: orange;">private key</b>. Due to this
          password-like property of <b style="color: orange;">private key</b>, it is used to sign all content originating
          from your user profile and the associated verifiable
          signature is a proof of your identity. Nostr relays are designed to verify signatures before relaying your
          content. Private messages on Nostr network are also end-to-end encrypted using <b style="color: orange;">private
            keys</b> by default.
        </p>
        <p>
          You may see the keys in your keypair displayed in couple of different formats depending on
          the Nostr client that you use. Please don't be alarmed by this. They both represent the same
          data but simply use two different encoding methods to make the key values human-readable. The
          NPUB (for <span style='text-decoration: underline;'>N</span>ostr
          <span style='text-decoration: underline;'>Pub</span>lic key; begins with <code class="code">npub</code>) and
          NSEC
          (for <span style='text-decoration: underline;'>N</span>ostr
          <span style='text-decoration: underline;'>Sec</span>ret key; begins with <code class="code">nsec</code>) format
          that Damus
          uses is preferable over the hex format that Nostr uses since there is a visual
          indicator preventing the user from mixing up their public and private keys. Dostr
          also adopts this format.
        </p>
      </q-card-section>
    </q-expansion-item>
    <div style='max-height: 0; border-top: 1px solid #b6c6e39f' />
    <q-expansion-item dense dense-toggle group='info' class="no-padding full-width" header-class='items-center'>
      <template #header>
        <span class='full-width text-bold text-uppercase'>Why shouldn't I enter my private key?</span>
      </template>
      <q-card-section class='tight-text'>
        <p>
          When you enter your <b style="color: orange;">private key</b> into any Nostr client, you are trusting that
          client to:
        <ol>
          <li>Not store your <b style="color: orange;">private key</b></li>
          <li>Not have any vulnerabilities that a bad actor can exploit to steal your <b style="color: orange;">private
              key</b></li>
        </ol>
        While Dostr can promise that it does not store your <b style="color: orange;">private key</b> (it is stored
        locally in your
        browser and is NEVER sent to Dostr) and that Dostr does its best to prevent vulnerabilities,
        it is still recommeneded that you <strong>DO NOT TRUST ANY CLIENT</strong>.
        </p>
        <p>
          Until recently, Nostr provides an easy way for you to sign into Nostr clients on desktop devices without
          ever providing the client with your private key via browser extensions like
          <a href='https://GetAlby.com/' target='_blank' rel='noopener noreferrer'>GetAlby</a> or <a
            href='https://github.com/fiatjaf/NOS2X#install' target='_blank' rel='noopener noreferrer'>NOS2X</a>.
          These browser extensions will store your private key locally
          in your browser and <b>only</b> when the client needs to send an event or decrypt your messages (i.e. use your
          <b style="color: orange;">private key</b>), it will employ your browser extension to perform the necessary
          cryptographic functions. See sections below for detailed instructions on how to use these
          browser extensions.
        </p>
        <p>
          Unfortunately, but only until now, you could use browser extensions on mobile devices so it had become
          necessary to enter your private key manually on mobile devices. <b style="color: lightgreen;">But thanks to
            Dostr's implementation, users
            will
            now be able to Sign-In With Ethereum using their Ethereum mobile wallets such as Metamask, Rainbow, Trust
            Wallet or
            Wallet Connect also on mobile devices!</b>
        </p>
      </q-card-section>
    </q-expansion-item>
    <div v-if='$store.state.keys.priv' style='max-height: 0; border-top: 1px solid #b6c6e39f' />
    <q-expansion-item
v-if='$store.state.keys.priv' dense dense-toggle group='info' class="no-padding full-width"
      header-class='items-center'>
      <template #header>
        <span class='full-width text-bold text-uppercase'>How do I remove my private key if I already entered it?</span>
      </template>
      <q-card-section class='tight-text'>
        <p>
          If you are on a mobile device, you will not be able to use the directions outlined below since browser
          extensions
          are
          not supported on mobile devices. If you are on a desktop device, please continue reading:
        </p>
        <ol>
          <li>Hit the <strong>VIEW YOUR KEYS</strong> at the bottom of the Settings page and note down your <b
              style="color: orange;">private key</b>.
          </li>
          <li>Enter your noted <b style="color: orange;">private key</b>. Remember not to generate a new one.</li>
          <li>Hit the <strong>LOGOUT</strong> at the bottom of the Settings page. <strong>LOGOUT</strong> will wipe your
            user data but preserve the existing browser localdata. <strong>DELETE LOCAL DATA</strong> will wipe your user
            data as well as the local browser data.</li>
          <li>Hit the <strong>USE PUBLIC KEY FROM EXTENSION</strong> option that should appear in the key input.</li>
          <p>
            <strong>Note:</strong>
            If Dostr doesn't refresh automatically please refresh the page.
          </p>
        </ol>
      </q-card-section>
    </q-expansion-item>
    <div style='max-height: 0; border-top: 1px solid #b6c6e39f' />
    <q-expansion-item dense dense-toggle group='info' class="no-padding full-width" header-class='items-center'>
      <template #header>
        <span class='full-width text-bold text-uppercase'>How to get a keypair?</span>
      </template>
      <q-card-section class='tight-text'>
        <p>
          You can use any method you want to generate your keys, as long as they
          conform to the <a
href='https://github.com/nostr-protocol/nips/blob/master/01.md' target='_blank'
            rel='noopener noreferrer'>Nostr NIP-01</a>
          specification.
        <ul>
          <li>If you wish to generate your keys using Ethereum Signatures <a
              href='https://github.com/dostr-eth/nips/blob/ethkeygen/xx.md' target='_blank'
              rel='noopener noreferrer'>(NIP-XX specification)</a> and use your ENS identity on Nostr, please use <b
              style="color: lightgreen;">SIGN-IN WITH
              ETHEREUM</b> button. You can use this on desktop as well as mobile devices.
          </li>
          <li>If you are on a desktop device and do not wish to use Ethereum, the standard option will be using a browser
            extension like
            <a href='https://GetAlby.com/' target='_blank' rel='noopener noreferrer'>GetAlby</a> or <a
              href='https://github.com/fiatjaf/NOS2X#install' target='_blank' rel='noopener noreferrer'>NOS2X</a>.
          </li>
          <li>If you are on a mobile device and do not wish to use Ethereum, the only option is to manually generate keys
            and keep them safe at your own discretion.</li>
          <li>If you are a technical user who is concerned about the key generation methods implemented by Dostr, you can
            try independent local keygen options.</li>
        </ul>
        </p>
        <p>
          <b>Note:</b> If you already have a keypair and simply wish to enter it into a browser extension, follow the
          instructions in the applicable sub-section below and enter your private key (instead of hitting
          'Generate'). Please make sure to hit 'Save' afterward when using NOS2X. <strong>If your existing <b
              style="color: orange;">private key</b>
            begins with
            <code class="code">nsec</code> you will need to convert it to hex format</strong> before saving it in the
          browser extensions; this
          can be done <a href='https://damus.io/key/' target='_blank' rel='noopener noreferrer'>with this Damus tool</a>.
        </p>
        <p>
          Choose your key generation method:
        </p>
        <div style='border: 1px solid #b6c6e39f; border-radius: .5rem;'>
          <q-expansion-item
dense dense-toggle group='generateKeys' class="no-padding full-width"
            header-class='items-center'>
            <template #header>
              <div class='full-width'>
                <span class='text-bold gt-sm'>Use Ethereum<img
src="ethereum.svg" alt="mascot_round" class="image-fit"
                    style="width: 3%; margin: -5px -3px -6px 8px; align-items: center;" /></span>
                <span class='text-bold lt-md'>Use Ethereum<img
src="ethereum.svg" alt="mascot_round" class="image-fit"
                      style="width: 4%; margin: -5px -3px -6px 8px; align-items: center;" /></span>
              </div>
            </template>
            <q-card-section>
              <ol>
                <li>Install any Ethereum wallet such as <a
href='https://GetAlby.com/' target='_blank'
                    rel='noopener noreferrer'>🦊 MetaMask</a> or <a
href='https://GetAlby.com/' target='_blank'
                    rel='noopener noreferrer'>🌈 Rainbow</a> etc.
                </li>
                <li>When prompted for login, simply use <b>SIGN-IN WITH ETHEREUM</b> button.
                </li>
              </ol>
            </q-card-section>
          </q-expansion-item>
          <div style='max-height: 0; border-top: 1px solid #b6c6e39f' />
          <q-expansion-item
dense dense-toggle group='generateKeys' class="no-padding full-width"
            header-class='items-center'>
            <template #header>
              <span class='full-width text-bold'>Use NOS2X</span>
            </template>
            <q-card-section>
              <ol>
                <li>Install <a
href='https://github.com/fiatjaf/NOS2X#install' target='_blank'
                    rel='noopener noreferrer'>NOS2X</a> browser extension.</li>
                <li>Open the NOS2X extension options page, usually located in a dropdown menu when clicking on extension's
                  icon
                  at the
                  top of your browser.</li>
                <li>Hit <strong>Generate</strong> button. If you already have a <b style="color: orange;">private key</b>,
                  enter it and hit
                  <strong>Save</strong>.
                </li>
                <li>Refresh Dostr webpage and hit the <strong>USE PUBLIC KEY FROM EXTENSION</strong> option that should
                  appear in the key input.</li>
              </ol>
            </q-card-section>
          </q-expansion-item>
          <div style='max-height: 0; border-top: 1px solid #b6c6e39f' />
          <q-expansion-item
dense dense-toggle group='generateKeys' class="no-padding full-width"
            header-class='items-center'>
            <template #header>
              <div class='full-width'>
                <span class='text-bold'>Use GetAlby</span>
              </div>
            </template>
            <q-card-section>
              <ol>
                <li>It is a longer setup than NOS2X but includes password protection, a lightning wallet and better
                  maintainance.</li>
                <li>Install <a href='https://GetAlby.com/' target='_blank' rel='noopener noreferrer'>GetAlby</a> browser
                  extension and complete Alby setup.</li>
                <li>When the prompt <strong>Do you have a lightning wallet?</strong> appears, simply hit
                  <strong>Alby Wallet</strong> if you do not have one.
                </li>
                <li>Open the GetAlby extension options page, usually located in dropdown menu when clicking on extension's
                  icon at the
                  top of your broswer.</li>
                <li>Hit the <strong>Settings</strong> tab.</li>
                <li>Scroll down to the <strong>Nostr</strong> section and hit <strong>Generate</strong> button. If you
                  already
                  have a <b style="color: orange;">private key</b>, enter it.</li>
                <li>Refresh Dostr webpage and hit the <strong>USE PUBLIC KEY FROM EXTENSION</strong> option that should
                  appear in the key input.</li>
              </ol>
            </q-card-section>
          </q-expansion-item>
          <div style='max-height: 0; border-top: 1px solid #b6c6e39f' />
          <q-expansion-item
dense dense-toggle group='generateKeys' class="no-padding full-width"
            header-class='items-center'>
            <template #header>
              <span class='full-width text-bold'>Use Nostr</span>
            </template>
            <q-card-section>
              <ol>
                <li>Hit <strong>GENERATE KEYS</strong> button below in the key input</li>
                <li>Proceed to use Nostr network</li>
              </ol>
            </q-card-section>
          </q-expansion-item>
          <div style='max-height: 0; border-top: 1px solid #b6c6e39f' />
          <q-expansion-item
dense dense-toggle group='generateKeys' class="no-padding full-width"
            header-class='items-center'>
            <template #header>
              <span class='full-width text-bold'>Use Local Machine</span>
            </template>
            <q-card-section>
              <ol>
                <li>Open Terminal</li>
                <li>Enter the following command to generate keypair:
                  <code class="code">openssl rand -hex 32</code>
                </li>
              </ol>
            </q-card-section>
          </q-expansion-item>
        </div>
      </q-card-section>
    </q-expansion-item>
    <div style='max-height: 0; border-top: 1px solid #b6c6e39f' />
    <q-expansion-item dense dense-toggle group='info' class="no-padding full-width" header-class='items-center'>
      <template #header>
        <span class='full-width text-bold text-uppercase'>how to use dostr?</span>
      </template>
      <q-card-section>
        <ol>
          <li>
            <strong>SIGN-IN WITH ETHEREUM</strong> or <strong>ENTER KEY</strong>. If you don't have a keypair, or you
            have a keypair that you want to manually enter into a Nostr browser extension, see the sections above.
          </li>
          <li>
            <strong>CHOOSE BOOTSTRAP RELAYS (OPTIONAL)</strong> This section will only appear once a valid key has
            been entered. If you are using a brand new key, you don't need
            to worry about this. If you are using an existing key and don't typically use any of the selected
            relays, make sure to include a relay that you typically use or Dostr may not be able to find your user.
            The bootstrap relays are NOT used as your user's relay list; Dostr only uses these relays to find your
            user information and settings when loading your Nostr account.
          </li>
          <li>
            Hit <strong>PROCEED</strong>. Dostr will login and attempt to find your user information. Please
            remain patient since it can take a few minutes to completely sync with Nostr relays.
          </li>
          <li>
            If you are not using Sign-In With Ethereum, we stronly suggest you to <strong style="color: orange;">BACK UP
              YOUR KEYS!!!</strong>.
            Once you are taken
            to the Settings page, you should get a
            popup displaying your Nostr keys. Make sure to make a backup of your Nostr keys and keep it
            somewhere safe. If you lose your Nostr keys you lose access to your Nostr user identity. There is no
            Dostr customer service to reset your password. Even when using Ethereum to login, it is generally good
            practise to back up your keys.
          </li>
          <li>
            To customise, hit the <strong>EDIT</strong> button for whichever section you would
            like to edit settings the for.
            <ul>
              <li><strong>Profile:</strong> Saving this section will broadcast your updated user profile to the
                Nostr relays. Note: if you have never set your relays on Nostr network, Dostr client will use its default
                relay
                list to set and broadcast your set Nostr relays at the same time. All fields in the profile are
                completely optional, you don't need to set a profile at all to use Nostr network.
                <ul>
                  <li><strong>Name:</strong> Non-unique username that will be displayed accross Nostr</li>
                  <li><strong>About:</strong> Share a little about yourself</li>
                  <li><strong>Picture:</strong> Image url for the picture that you would like to be displayed as your
                    Nostr
                    profile picture</li>
                  <li><strong>NIP-05 Identifier:</strong> Intended to be a unique, human-readable identifier for
                    Nostr (read more <a
href='https://github.com/nostr-protocol/nips/blob/master/05.md' target='_blank'
                      rel='noopener noreferrer'>here</a>)
                  </li>
                </ul>
              </li>
              <li><strong>Preferences:</strong> Saving this section will update the look of Dostr for this browser.
                This section is not synced to Nostr network and is purely local.</li>
              <li><strong>Relays:</strong> Saving this section will broadcast your updated relay list to the
                Nostr relays.</li>
            </ul>
          </li>
        </ol>
      </q-card-section>
    </q-expansion-item>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseInformation',
})
</script>

<style lang="css" scoped>
.q-expansion-item {
  font-family: "SF Mono";
  font-weight: 400;
  font-size: 14px;
}

.tight-text {
  letter-spacing: -0.5px;
  font-weight: 400;
}

.text-head {
  font-family: "Rajdhani";
  letter-spacing: 0.5px;
  font-size: 17px;
  font-weight: 600;
}

a {
  text-decoration: none;
  color: skyblue;
}
</style>
