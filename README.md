# Wake Word App
This repository was created to store the base code for an app used to record audio samples for Speech Recognition training. The app checks a remote API to download words which are recommended to the user, as well as other aesthetic directives to apply to the app based on the recommended word.

## Requirements Overview
This project is built using the following resources:
* [React-Native](https://facebook.github.io/react-native/) - Framework for App development in iOS and Android.
* [XCode](https://developer.apple.com/xcode/) - Apple proprietary tool to publish iOS apps. 
* [Android Studio](https://developer.android.com/studio/) - Android proprietary tool to publish Android apps.

I highly recommend you download a good text editor with JSX indentation, I personally use [Atom](https://atom.io/) with the [Babel Language Package](https://atom.io/packages/language-babel).

## Installing
This tutorial will run you through how to install and run the app on your Mac computer simulator, both for iOS and Android. If you wish to work on Windows please refer the [React Native Getting Started Tutorial](https://facebook.github.io/react-native/docs/getting-started.html).

### First Steps
You will first need to download [Homebrew](https://brew.sh/) (a dependencies manager) in order to install React Native. Open a terminal window and run the following command.
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
You can now install [NodeJS](https://nodejs.org/en/). Run the following command.\
```
brew install node
```
Node will automatically install its command line tool *npm*. You can use it to download React-Native. You will do so using the following command.
```
npm install -g react-native-cli
```

Finally, you will need to install all the dependencies for the app to work. Navigate to your repository's folder on the terminal.
```
cd /path/to/repository
```

And run the following command to install all packages.
```
npm install
```
Your app is now ready to be run! Follow the next steps to either run it on the iOS or Android simulator on your computer.

### iOS Simulator
The first step here is to [download XCode from the AppStore](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). When this is done, open a new project and click on XCode (on top of the screen, in the menu bar) and Preferences. A window should appear, click on Locations and toggle *Command Line Tools* to XCode 10.1 (or the latest version available). This will turn on the XCode command line tools, which will allow you to run your app on the simulator.

You now only have to navigate back to your repository on the terminal and run the following command to visualize the app. 
```
react-native run-ios
```
If the app doesn't launch properly (you get a red screen with white text before it renders), reference the Troubleshooting section of this document.

### Android Simulator
Similarly to iOS, you need to donwload the Android development environment - in this case Android Studio - in this [link](https://developer.android.com/studio/). You will need to select specific settings throughout the installation process as well as setup your paths for Android SDK and install Android JDK, you can reference [this tutorial](https://medium.com/pvtl/react-native-android-development-on-mac-ef7481f65e47). 

This tutorial is unfortunately rather outdated, I will give you a couple pointers on what you should differently with the new Android Studio version. In section 4.2, instead of running the command *android sdk*, you can simply go to Preferences (or Configure) and SDK Manager. From there find *Android SDK*, in it *SDK Platforms* and toggle *Show Package Details*. You should then be able to see the System Images the tutorial recommends to download.

For the final step of the tutorial (section 5), once again instead of using the terminal, you can create a new simulator by opening a new project and clicking the purple square icon on the top right (AVD Manager). You can then proceed to create a new virtual device of your choice. 

For Android, you must always run your simulator before running the app. To do so, after the Virtual Device is created, press the green *play button* to launch the emulator. You now can navigate to your project folder with the terminal and run the following command.
```
react-native run-android
```

## Troubelshooting

You might encounter several issues when installing and running the app, I will guide you through several easy fixes for the most common issues. 

### iOS installation Fixes
You might run into an error right away before the app renders for the first time, signaling that a package was not located. If this is the case, your React-Native version might not be compatible with the project. To check your react native version, run:
``` 
react-native -v
```
If your version is above 0.56.1, your version might not be compatible. To change it, find the *package.json* file and change your react-native version under dependencies.
```
"react-native": "^0.56.1",
```
### No Bundle File
If your app fails to render because it failed to locate the Bundle File, simply open the file AppDelegate.m in the folders ios/audioapp. Make sure the correct part of the code is commented out as follows:
```
//Local host: To run on computer simulator
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  //Bundle file: To run on device
  //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This app is based on the previous work of Peter Oliveira Soens and Alex Gaidis.
* The supervisor for this project is Professor Brian Subirana, Director of the MIT AutoID Lab.
