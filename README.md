# Platform Tools

Provides Ionic Framework way class mapping of current platform and orientation on the root document node ´html´ for usage inside scss or :host-context selecting.

## Usage
Simply inject the service in your root app component and it will add classes to your document.
```typescript
import {PlatformToolsService} from "./platform-tools.service";

export class AppComponent {
  public constructor(
      // ... 
    private readonly platformService: PlatformToolsService
      // ... 
  ) {

  }
}

```
Now you're able to use `:host-context(.plt-tablet)` at Angular Component SCSS level for writing context based css,
or use at global.scss/style.scss as selector `.plt-tablet > app-component { ... }`.

### Available class selectors:
| Selector Name | Description                              |
|---------------|------------------------------------------|
| plt-android       | a device running Android                 |
| plt-desktop       | a desktop device                         |
| plt-ios           | a device running iOS                     |
| plt-ipad          | an iPad device                           |
| plt-iphone        | an iPhone device                         |
| plt-mobile        | a mobile device                          |
| plt-mobileweb     | a web browser running in a mobile device |
| plt-phablet       | a phablet device                         |
| plt-pwa           | a PWA app                                |
| plt-tablet        | a tablet device                          |
| is-landscape        | a device with landscape orientation                          |
| is-portrait        | a device  with portrait orientation                        |


## Example

### Author
* [Sven Graziani](SGraziani@anexia-it.com)

### Credits
To the Ionic Framework core team for the inspiration.
