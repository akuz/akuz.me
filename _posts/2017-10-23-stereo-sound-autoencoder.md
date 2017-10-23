---
layout: post
title: Stereo Sound Autoencoder
---

I've decided to test a small (not very deep) autoencoder on the audio data.
It has two convolutional layers, with convolutions of size 4 and strides of 2,
with ReLU nonlinearities. This results in 1/4 frame rate of the original audio.

<img src="{{ site.baseurl}}/media/img/StereoAutoencoder.png" style="margin-left: 50px" />

The corresponding deconvolutions are then applied.
The network is trained using the Adam algorithm using batches of 100 audio
segments of 1024 stereo samples each. This only takes a few seconds, when
training on the random batches extracted from the same song, and
the parameters converge after 150 iterations. The animation below shows
how the ability of the network to encode a random sample of music
changes with training, during all 150 iterations (the gif is looped on
itself backwards). Notice how it learns the mono features first, and
then adjusts them to approximate the stereo music better.

<img src="{{ site.baseurl}}/media/img/StereoAutoencoder1.gif" />

This of course does <em>not</em> result in any compression because,
even though we reduced the frame rate to 1/4 of the original, we now
have 64 channels per sample versus the original 2 channel stereo.
This gave me an interesting idea that with enough structure extracted
in the features trained on a single song (or an artist), it might be
possible to achieve a very high compression ratio &mdash; I am sure
somebody is already working on this idea. If not, please thank me later.

Please click the link below to see 3 more gifs (+15 Mb to your traffic)
with some further comments on the ability of the above autoencoder to
approximate the music with 64 features at 1/4 of the original frame rate.

<!--more-->

<img src="{{ site.baseurl}}/media/img/StereoAutoencoder2.gif" />

The above gif shows a more or less regular frequency superposition.
Notice small imperfections in approximating sharp corners, resulting
from having only 64 features in the narrowest autoencoder layer.

<img src="{{ site.baseurl}}/media/img/StereoAutoencoder3.gif" />

The above gif shows that low frequencies are aproximated rather well.
Also, you can see interesting artefacts at the edges of the segment
&mdash; the network does not have enough "power" to push the
approximation away from zero, because the output neurons there
receive inputs from the fewer number of inner neurons, because
I used 'SAME' convolution mode in TensorFlow (this can
be fixed with a simple adjustment).

<img src="{{ site.baseurl}}/media/img/StereoAutoencoder4.gif" />

Finally, the above gif shows that the aproximation is not very good
with very high frequencies. Of course, this is because there are only
64 features, and moreover each of them has a field of view of 8 audio
samples. It is an interesting question whether these should be learnt
at the expence of more features, or possibly, a special "noise"
feature could be added.

You can find a Jupyter Notebook with my code
<a href="https://gist.github.com/akuz/0039b1d4c5ee261634bc7b294ef33c35">here</a>,
but you won't be able to run it, since it uses some of my audio preprecessing.
Anyway, at least you can see my sloppy TensorFlow model, if you wanted to.

This has been fun ;)