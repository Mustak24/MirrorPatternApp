# Mirror Pattern App

A creative React Native mobile application that transforms photos into stunning mirror pattern designs. Capture or select images and instantly create beautiful kaleidoscope-style symmetrical patterns.

## ✨ Features

- 📸 **Camera Integration** - Capture photos directly from the app using the device camera
- 🖼️ **Gallery Access** - Select images from your device's photo gallery
- 🎨 **Mirror Pattern Generation** - Create beautiful symmetrical patterns from any image
- 💾 **Save & Share** - Save your created patterns to your device
- 🎯 **My Designs** - View and manage all your saved pattern designs
- ⚙️ **Settings** - Customize app preferences and manage permissions
- 🔒 **Privacy Policy** - Built-in privacy policy page

## 📱 Screenshots

_Transform any photo into mesmerizing mirror patterns with just a tap!_

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 22.11.0
- **React Native development environment** set up ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))
- **Android Studio** (for Android development)
- **Xcode** (for iOS development on macOS)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd MirrorPatternApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)

   ```bash
   # Install Ruby bundler
   bundle install

   # Install CocoaPods dependencies
   cd ios
   bundle exec pod install
   cd ..
   ```

### Running the App

1. **Start Metro bundler**

   ```bash
   npm start
   ```

2. **Run on Android**

   ```bash
   npm run android
   ```

3. **Run on iOS**
   ```bash
   npm run ios
   ```

## 🛠️ Tech Stack

### Core Technologies

- **React Native** 0.84.0 - Cross-platform mobile framework
- **React** 19.2.3 - UI library
- **TypeScript** 5.9.3 - Type-safe development

### Navigation & UI

- **React Navigation** - Native stack navigation
- **NativeWind** 4.2.1 - Tailwind CSS for React Native
- **Lucide React Native** - Beautiful icon set
- **React Native Gesture Handler** - Smooth gesture interactions
- **React Native Safe Area Context** - Safe area management

### Image Processing & Camera

- **React Native Vision Camera** 4.7.3 - Advanced camera functionality
- **React Native Image Crop Picker** - Image selection and cropping
- **React Native View Shot** - Capture and save component screenshots
- **React Native SVG** - SVG rendering support

### Storage & State Management

- **React Native MMKV** - Fast, efficient key-value storage
- **@funtools/store** - Lightweight state management
- **@react-native-camera-roll/camera-roll** - Gallery access

### Performance

- **React Native Nitro Modules** - High-performance native modules

## 📂 Project Structure

```
MirrorPatternApp/
├── src/
│   ├── App.tsx                    # Root application component
│   ├── Navigation/                # Navigation configuration
│   ├── Screens/                   # Application screens
│   │   ├── CameraScreen/         # Camera capture screen
│   │   ├── HomeScreen/           # Main home screen with designs
│   │   ├── MirrorPatternScreen/  # Pattern creation & preview
│   │   └── SettingScreen/        # App settings
│   └── Shared/                    # Shared components, utilities, stores
├── static/                        # Static assets (privacy policy, etc.)
├── android/                       # Android native code
├── ios/                          # iOS native code
└── global.css                    # Global styles
```

## 🎯 How to Use

1. **Launch the App** - Open the Mirror Pattern App on your device
2. **Choose an Image Source**:
   - Tap the camera icon to capture a new photo
   - Select an existing image from your gallery
3. **Create Pattern** - The app automatically generates a mirror pattern from your image
4. **Save Your Design** - Save your creation to your device
5. **View My Designs** - Access all your saved patterns from the home screen

## ⚙️ Development

### Available Scripts

```bash
npm start          # Start Metro bundler
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run lint       # Run ESLint
npm test          # Run tests
```

### Code Style

This project uses:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 📋 Permissions

The app requires the following permissions:

- **Camera** - To capture photos for pattern creation
- **Photo Library** - To access and save images
- **Storage** - To save generated patterns

## 🔧 Troubleshooting

### Metro Bundler Issues

```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Android Build Issues

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS Build Issues

```bash
cd ios
bundle exec pod install
cd ..
npm run ios
```

For more help, see the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the project maintainer.

## 📚 Learn More

- [React Native Documentation](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [NativeWind](https://www.nativewind.dev)
- [React Native Vision Camera](https://react-native-vision-camera.com)

---

**Made with ❤️ using React Native**
