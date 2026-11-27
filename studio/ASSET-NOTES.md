# Portrait preparation

The original `site/assets/faik-studio-hero.jpg` is unchanged. The new hero uses `site/assets/faik-cutout.webp`, prepared from the supplied `Downloads/ME/me(8).jpg`. The generated PNG is also retained as `site/assets/faik-cutout.png`.

Mode: built-in ImageGen, background extraction with an explicit identity-preservation request. The result was visually compared with the supplied portrait before use. WebP preparation only trims transparent margins and resizes for delivery. The monochrome hero treatment is CSS.

Final prompt:

> Use case: background-extraction. Edit target: the supplied portrait photograph. Create a clean transparent-background cutout of this exact person for a website hero. Remove only the red/black background. Preserve the person's exact face, sunglasses, hair, facial features, black turtleneck and blazer, body pose, proportions, and photographic details. Do not beautify or restyle or change likeness. Preserve the existing waist-up framing and the entire shoulders and clothing visible in the photograph. No new objects, no text, no drop shadow. Output actual alpha transparency around the person, accurate fine hair and shoulder edges. Keep the subject unchanged; this is background removal only.
