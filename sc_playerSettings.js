import videojs from 'video.js';

const SettingsPlugin = videojs.getPlugin('plugin');

class CombinedSettingsPlugin extends SettingsPlugin {
  constructor(player, options) {
    super(player, options);
    this.player = player;
    this.options = options;
    this.captionsVisible = false; // Initially, captions are hidden
    this.audioTracksVisible = false; // Initially, audio tracks are hidden
    this.settingsButton = this.createSettingsButton();
    this.attachEvents();
  }

  createSettingsButton() {
    // Create a button in the control bar for "Settings" (cog icon)
    const settingsButton = this.player.controlBar.addChild('button', {
      text: 'Settings',
      className: 'vjs-settings-button',
    });

    // Customize the appearance of the button
    settingsButton.addClass('vjs-icon-cog');
    settingsButton.addClass('vjs-control');

    // Add the button to the control bar
    this.player.controlBar.el().appendChild(settingsButton.el());

    return settingsButton;
  }

  attachEvents() {
    // Handle click event for the "Settings" button
    this.settingsButton.on('click', () => {
      // Toggle visibility of captions and audio tracks
      this.captionsVisible = !this.captionsVisible;
      this.audioTracksVisible = !this.audioTracksVisible;

      // Update the display of captions and audio tracks
      this.updateSettingsDisplay();
    });

    // Handle changes in caption and audio track selection
    this.player.on('captionstrackschanged', () => {
      // Update the display of captions and audio tracks when changed
      this.updateSettingsDisplay();
    });
  }

  updateSettingsDisplay() {
    // Show or hide the captions menu based on visibility
    if (this.captionsVisible) {
      this.player.controlBar.getChild('CaptionsButton').show();
    } else {
      this.player.controlBar.getChild('CaptionsButton').hide();
    }

    // Show or hide the audio tracks menu based on visibility
    if (this.audioTracksVisible) {
      this.player.controlBar.getChild('AudioTrackButton').show();
    } else {
      this.player.controlBar.getChild('AudioTrackButton').hide();
    }
  }
}

videojs.registerPlugin('combinedSettings', CombinedSettingsPlugin);