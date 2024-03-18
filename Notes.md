# Some notes while learning threejs

### We need 4 elements for a basic scene
1. Scene *obviously*
2. Objects *thigs that we would like to see*
3. Camera *duh!! a camera is also a object, by the way*
4. And a renderer


- Unlike scale and position, rotation is not a Vector3. Rotation is an Eule

## <span style="color:magenta">Cameras</span>

1. **Camera**: This is an abstract base class. This class should always be inherited when you build a new camera, i.e. when you use classes like PerspectiveCamera or any other class, they already inherit the Camera class, so you're not using the base Camera class directly(which is a good thing and is instructed in the documents like this only).

2. PerspectiveCamera(fov, aspect ration, near, far);
    - fov is field of view, near and far are the range points, anything before near point and anything after the far point won't get displayed
    - Don't put extreme values in near and far. Values like 0.00001 for near, and 999999 for far could cause some glitches. Values like 0.1 for near and 100 or 200 for far would work fine. And these values are not a hard and fast rule, you can change accordingly.


## <span style="color:magenta">Colors and Textures</span>
1. Color property is not a string, a bollean, or a number. It's an instance of the Three.js Color class, so in gui we need to use addColor(...) instead of add(...).

2. Textures are images that will cover the surface of the geometries

3. Users will have to dodwnload a lot of textures at times, so to make the right decision for your project keep the following things in mind
    - .jpg is lossy compression but usually lighter
    - .png is lossess compression but usually heavier
    - you can use compression software or websites like [TinyPNG](https://tinypng.com/) or some other site


## <span style="color:magenta">Thigs to keep in mind about GPUs</span>
* Each pixel of the texture will have to be stored on the GPU regardless of the image's weight, and since GPUs have storage limitations we have to be careful while sending textures and images to GPU.
* Mipmapping increases teh the number of pixels to store on the GPU to try to reduce the size of your images as much as possible.

* **Mipmaping** : The mipmaping will produce a half smaller version of the texture repeatedly until we have 1x1 texture. Because of that widht and height of the texture/image must be a power of 2. Some examples are as follow:
    * 512x512
    * 1024x1024
    * 512*2048


## Shadows

* Only the following types of lights suppert shadows:
 * Pointlight
 * DirectionalLight
 * Spotlight




