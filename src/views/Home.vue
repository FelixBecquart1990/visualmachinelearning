<template>
  <div class="home">
    <v-container style="max-width:900px">
      <v-stepper v-model="step" vertical class="elevation-0">
        <v-stepper-step :complete="step > 1" step="1">
          Introduction
          <!-- <small>Summarize if needed</small> -->
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card class="mb-5 pa-4" outlined>
            <div class="body-1 ml-3">
              This application has been created to help people to visualy &#128064; understand how machine learning works.
              <br />We will go through a basic 5 minute example of real estate &#127969; price prediction.
            </div>
          </v-card>
          <v-btn color="primary" @click="next()" rounded class="mb-2">Let's go &#128640;</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">
          Load and prepare data
          <!-- <small>Summarize if needed</small> -->
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card class="mb-5 pa-4" outlined>
            <h3 class="headline mb-3">Load data</h3>
            <div class="body-1 ml-3">
              First we need to extract our dataset from a local
              <a
                href="https://raw.githubusercontent.com/FelixBecquart1990/visualmachinelearning/master/public/data.csv"
                target="_blank"
                class="text--info"
                style="text-decoration: none;"
              >CSV file &#128196;</a> available in this application.
              <br />We will not use the whole dataset so we only select &#128373; the two columns that we will need:
              <p class="my-2 ml-3">
                &#128319; Price &#128178;
                <br />&#128319; Square feet &#127969;
              </p>A good way to understand our dataset is to &#128200; visualize it.
            </div>
            <v-btn
              @click="loadData()"
              :disabled="disableLoadData"
              :loading="loadingData"
              color="primary"
              rounded
              class="my-3 ml-3"
            >Load Data &#128722;</v-btn>
            <v-scroll-y-transition>
              <div v-if="disableLoadData">
                <h3 class="headline mb-3">Prepare data</h3>
                <div class="body-1 ml-3">
                  Here we are, the dataset is loaded &#127881;!
                  <br />To fit our model, we now need to prepare &#127869; our dataset with the following steps:
                  <p class="my-2 ml-3">
                    &#128319; Shuffle &#127922; the dataset to avoid unbalanced training
                    <br />&#128319;
                    <a
                      href="https://developers.google.com/machine-learning/data-prep/transform/normalization"
                      target="_blank"
                      class="text--info"
                      style="text-decoration: none;"
                    >Normalize</a> &#127981; the dataset to work with the same scale
                    <br />&#128319;
                    <a
                      href="https://developers.google.com/machine-learning/crash-course/training-and-test-sets/splitting-data"
                      target="_blank"
                      class="text--info"
                      style="text-decoration: none;"
                    >Split the dataset</a> into a training &#128296; dataset and a testing &#128269; dataset
                  </p>
                </div>

                <v-btn
                  @click="prepareData()"
                  :disabled="disablePrepareData"
                  color="primary"
                  rounded
                  class="my-3 ml-3"
                >Prepare Data &#127858;</v-btn>
              </div>
            </v-scroll-y-transition>
          </v-card>
          <v-btn
            color="primary"
            @click="next()"
            rounded
            :disabled="disableStep1"
            class="mb-2"
          >Continue</v-btn>
          <v-btn text rounded class="ml-3" @click="previous()">Previous</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 3" step="3">Create a model</v-stepper-step>
        <v-stepper-content step="3">
          <v-card outlined class="mb-5 pa-4">
            <div class="body-1 ml-3 mt-3 mb-2">
              Let's think &#128173; about the architecture of our model.
              <br />As we face a linear regression problem, we will only need one neuron &#127744;.
              <br />
              <br />Next, our model needs to be compiled with parameters like:
              <p class="my-2 ml-3">
                &#128319; An
                <a
                  href="https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/anatomy#common-activation-functions"
                  target="_blank"
                  class="text--info"
                  style="text-decoration: none;"
                >activation function</a> &#128678;
                <br />&#128319; The way we want to compute
                <a
                  href="https://developers.google.com/machine-learning/glossary#loss"
                  target="_blank"
                  class="text--info"
                  style="text-decoration: none;"
                >the error</a> &#128681;
              </p>
            </div>
            <v-btn
              @click="createModel()"
              :disabled="disableCreateModel"
              color="primary"
              rounded
              class="my-3 ml-3"
            >Create a model &#128736;</v-btn>
          </v-card>
          <v-btn
            color="primary"
            @click="next()"
            rounded
            :disabled="disableStep2"
            class="mb-2"
          >Continue</v-btn>
          <v-btn text rounded class="ml-3" @click="previous()">Previous</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 4" step="4">Train the model</v-stepper-step>
        <v-stepper-content step="4">
          <v-card outlined class="mb-5 pa-4">
            <div class="body-1 ml-3 mt-3 mb-2">
              Now it is time to fit &#127856; our model with the dataset.
              <br />We do it many times so that our model can learn &#128300; about this dataset.
              <br />With our model prediction &#128200; and the error rate &#128201; we can get a real time feedback of the evolution of our model &#128526;&#127871;.
            </div>
            <v-scroll-y-transition>
              <div v-if="epoch>0" class="ml-3">
                <strong>Epochs: {{epoch}}/20</strong>
              </div>
            </v-scroll-y-transition>

            <v-scroll-y-transition>
              <div class="ml-3" v-if="trainingStatus != ''">
                <strong>Trained loss: {{ trainingStatus }}</strong>
              </div>
            </v-scroll-y-transition>
            <v-btn
              @click="train()"
              :disabled="disableTrain"
              :loading="loadingTrain"
              color="primary"
              rounded
              class="my-3 ml-3"
            >Train model &#128170;</v-btn>
          </v-card>
          <v-btn
            color="primary"
            @click="next()"
            rounded
            :disabled="disableStep3"
            class="mb-2"
          >Continue</v-btn>
          <v-btn text rounded class="ml-3" @click="previous()">Previous</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 5" step="5">Test the model</v-stepper-step>
        <v-stepper-content step="5">
          <v-card outlined class="mb-5 pa-4">
            <div class="body-1 ml-3 mt-3 mb-2">
              Our model has been trained &#127882;!
              <br />We can now evaluate &#128207; it thanks to our testing dataset.
              <br />The goal is to compare the error rate of our training dataset and our testing dataset.
              <br />We want them to be as similar as possible. It means that our model has been trained correctly.
              <v-scroll-y-transition>
                <div v-if="testingStatus">
                  <v-container class="my-3">
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-card class="pa-2" outlined tile>Training Loss</v-card>
                      </v-col>
                      <v-col cols="6">
                        <v-card class="pa-2" outlined tile>Testing Loss</v-card>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-card class="pa-2" outlined tile>{{trainingStatus}}</v-card>
                      </v-col>
                      <v-col cols="6">
                        <v-card class="pa-2" outlined tile>{{testingStatus}}</v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                  <div>
                    Congratulations &#127775;, the training error rate is really close to the testing error rate.
                    <br />We now know that our model is ready to be used &#127870;.
                  </div>
                </div>
              </v-scroll-y-transition>
            </div>
            <v-btn
              @click="test()"
              :disabled="disableTest"
              :loading="loadingTest"
              color="primary"
              rounded
              class="my-3 ml-3"
            >Test model &#128170;</v-btn>
          </v-card>
          <v-btn
            color="primary"
            @click="next()"
            rounded
            :disabled="disableStep4"
            class="mb-2"
          >Continue</v-btn>
          <v-btn text rounded class="ml-3" @click="previous()">Previous</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 6" step="6">Predict</v-stepper-step>
        <v-stepper-content step="6">
          <v-card outlined class="mb-5 pa-4">
            <div class="body-1 ml-3 mt-3 mb-2">
              Here we are, we can now use our model to predict the price of any real estate &#127968;.
              <br />Enjoy &#127878;
            </div>
            <v-container class="mt-3 mb-0">
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    type="number"
                    label="Solo"
                    placeholder="ex: 2000"
                    solo
                    v-model="predictionInput"
                    suffix="Square feet"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-scroll-y-transition>
                    <div class="pa-3" tile v-if="predictionOutput">
                      <strong>{{ predictionOutput }}</strong>
                    </div>
                  </v-scroll-y-transition>
                </v-col>
              </v-row>
            </v-container>

            <v-btn @click="predict()" color="primary" rounded class="mb-3 ml-3">Predict &#128302;</v-btn>
          </v-card>
          <!-- <v-btn color="primary" @click="step = 1" rounded>Continue</v-btn> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                depressed
                small
                class="ml-2"
                color="transparent"
                @click="openInformationDialog()"
              >
                <v-icon class="text--primary">mdi-information-outline</v-icon>
              </v-btn>
            </template>
            <span>Information</span>
          </v-tooltip>
          <v-btn text rounded class="ml-3" @click="previous()">Previous</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-container>
    <!-- <v-btn @click="save()" :disabled="disableSave">Save</v-btn> -->
    <!-- <v-btn @click="load()" :disabled="disableLoadModel">Load Model</v-btn> -->
  </div>
</template>

<script>
// @ is an alias to /src
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export default {
  name: "Home",
  data() {
    return {
      step: 1,
      epoch: 0,
      disableStep1: true,
      disableStep2: true,
      disableStep3: true,
      disableStep4: true,

      disableLoadData: false,
      loadingData: false,
      disablePrepareData: true,
      disableCreateModel: false,

      disableTest: false,
      loadingTest: false,
      // disableSave: true,
      disablePredict: true,
      disableTrain: true,
      loadingTrain: false,

      // disableLoadModel: true,
      predictionInput: null,
      predictionOutput: "",
      trainingStatus: "",
      testingStatus: "",
      storageID: "kc-house-price-regression",
      model: null,
      points: null,
      normalisedFeature: null,
      normalisedLabel: null,
      trainingFeatureTensor: null,
      testingFeatureTensor: null,
      trainingLabelTensor: null,
      testingLabelTensor: null
    };
  },
  methods: {
    async loadData() {
      this.loadingData = true;
      // Import from CSV
      const houseSalesDataset = tf.data.csv("/data.csv");
      // Extract x and y values to plot
      const pointsDataset = houseSalesDataset.map(record => ({
        x: record.sqft_living,
        y: record.price
      }));
      this.points = await pointsDataset.toArray();

      if (this.points.length % 2 !== 0) {
        // If odd number of elements
        this.points.pop(); // remove one element
      }
      this.plot(this.points, "Square feet");
      this.disablePrepareData = false;
      this.loadingData = false;
      this.disableLoadData = true;
      this.$store.commit("setSnackbar", {
        color: "success",
        timeout: 3000,
        text: "Data successfully loaded"
      });
    },
    prepareData() {
      this.disablePrepareData = true;
      tf.util.shuffle(this.points);

      // Extract Features (inputs)
      const featureValues = this.points.map(p => p.x);
      const featureTensor = tf.tensor2d(featureValues, [
        featureValues.length,
        1
      ]);

      // Extract Labels (outputs)
      const labelValues = this.points.map(p => p.y);
      const labelTensor = tf.tensor2d(labelValues, [labelValues.length, 1]);

      // Normalise features and labels
      this.normalisedFeature = this.normalise(featureTensor);
      this.normalisedLabel = this.normalise(labelTensor);
      featureTensor.dispose();
      labelTensor.dispose();

      [this.trainingFeatureTensor, this.testingFeatureTensor] = tf.split(
        this.normalisedFeature.tensor,
        2
      );
      [this.trainingLabelTensor, this.testingLabelTensor] = tf.split(
        this.normalisedLabel.tensor,
        2
      );

      // Update status and enable train button
      // this.trainingStatus = "No model trained";
      this.disableStep1 = false;
      this.$store.commit("setSnackbar", {
        color: "success",
        timeout: 3000,
        text: "Data successfully prepared"
      });
    },
    createModel() {
      this.disableCreateModel = true;
      tfvis.visor().open();
      // Disable all buttons and update status
      // (this.disableSave = true),
      (this.disablePredict = true),
        // (this.disableLoadModel = true),

        (this.model = tf.sequential());

      this.model.add(
        tf.layers.dense({
          units: 1,
          useBias: true,
          activation: "linear",
          inputDim: 1
        })
      );

      const optimizer = tf.train.sgd(0.1);
      this.model.compile({
        loss: "meanSquaredError",
        optimizer
      });
      tfvis.show.modelSummary({ name: "Model summary" }, this.model);
      const layer = this.model.getLayer(undefined, 0);
      tfvis.show.layer({ name: "Layer 1" }, layer);

      this.disableStep2 = false;
      this.disableTrain = false;
      this.$store.commit("setSnackbar", {
        color: "success",
        timeout: 3000,
        text: "Model created"
      });
    },
    async train() {
      this.loadingTrain = true;
      await this.plotPredictionLine();

      const result = await this.trainModel();
      const trainingLoss = result.history.loss.pop();
      const validationLoss = result.history.val_loss.pop();

      this.trainingStatus = trainingLoss.toPrecision(5);
      // +`Validation loss: ${validationLoss.toPrecision(5)}`;

      this.disableTrain = true;
      this.loadingTrain = false;
      this.disableStep3 = false;
      this.$store.commit("setSnackbar", {
        color: "success",
        timeout: 3000,
        text: "Model trained"
      });
    },
    async trainModel() {
      const { onBatchEnd, onEpochEnd } = tfvis.show.fitCallbacks(
        { name: "Training Performance", tab: "Scatterplot & Performance" },
        ["loss"]
      );
      let self = this;
      tfvis.visor().open();
      tfvis.visor().setActiveTab("Scatterplot & Performance");
      return this.model.fit(
        this.trainingFeatureTensor,
        this.trainingLabelTensor,
        {
          batchSize: 32,
          epochs: 20,
          validationSplit: 0.2,
          callbacks: {
            onEpochEnd,
            onEpochBegin: async function() {
              self.epoch += 1;
              await self.plotPredictionLine();
              const layer = self.model.getLayer(undefined, 0);
              tfvis.show.layer({ name: "Layer 1" }, layer);
            }
          }
        }
      );
    },
    async test() {
      this.loadingTest = true;
      const lossTensor = this.model.evaluate(
        this.testingFeatureTensor,
        this.testingLabelTensor
      );
      const loss = (await lossTensor.dataSync())[0];
      this.testingStatus = loss.toPrecision(5);

      this.loadingTest = false;
      this.disableTest = true;

      this.disableStep4 = false;
      this.$store.commit("setSnackbar", {
        color: "success",
        timeout: 3000,
        text: "Model tested"
      });
    },

    async predict() {
      if (isNaN(this.predictionInput)) {
        alert("Please enter a valid number");
      } else if (this.predictionInput < 200) {
        alert("Please enter a value above 200 sqft");
      } else {
        tf.tidy(() => {
          const inputTensor = tf.tensor1d([Number(this.predictionInput)]);
          const normalisedInput = this.normalise(
            inputTensor,
            this.normalisedFeature.min,
            this.normalisedFeature.max
          );
          const normalisedOutputTensor = this.model.predict(
            normalisedInput.tensor
          );
          const outputTensor = this.denormalise(
            normalisedOutputTensor,
            this.normalisedLabel.min,
            this.normalisedLabel.max
          );
          const outputValue = outputTensor.dataSync()[0];
          const outputValueRounded = (outputValue / 1000).toFixed(0) * 1000;
          this.predictionOutput = `The predicted house price is $${outputValueRounded}`;
        });
      }
    },
    async toggleVisor() {
      tfvis.visor().toggle();
    },
    async plot(pointsArray, featureName, predictedPointsArray = null) {
      const values = [pointsArray.slice(0, 1000)];
      const series = ["original"];
      if (Array.isArray(predictedPointsArray)) {
        values.push(predictedPointsArray);
        series.push("predicted");
      }

      tfvis.render.scatterplot(
        {
          name: `${featureName} vs House Price`,
          tab: "Scatterplot & Performance"
        },
        { values, series },
        {
          xLabel: featureName,
          yLabel: "Price",
          height: 300
        }
      );
    },
    async plotPredictionLine() {
      const [xs, ys] = tf.tidy(() => {
        const normalisedXs = tf.linspace(0, 1, 100);
        const normalisedYs = this.model.predict(normalisedXs.reshape([100, 1]));

        const xs = this.denormalise(
          normalisedXs,
          this.normalisedFeature.min,
          this.normalisedFeature.max
        );
        const ys = this.denormalise(
          normalisedYs,
          this.normalisedLabel.min,
          this.normalisedLabel.max
        );

        return [xs.dataSync(), ys.dataSync()];
      });

      const predictedPoints = Array.from(xs).map((val, index) => {
        return { x: val, y: ys[index] };
      });

      await this.plot(this.points, "Square feet", predictedPoints);
    },
    normalise(tensor, previousMin = null, previousMax = null) {
      const min = previousMin || tensor.min();
      const max = previousMax || tensor.max();
      const normalisedTensor = tensor.sub(min).div(max.sub(min));
      return {
        tensor: normalisedTensor,
        min,
        max
      };
    },
    denormalise(tensor, min, max) {
      const denormalisedTensor = tensor.mul(max.sub(min)).add(min);
      return denormalisedTensor;
    },
    previous() {
      this.step -= 1;
      this.disableContinue = false;
    },
    next() {
      this.step += 1;
    },
    openInformationDialog() {
      this.$store.commit("setInformationDialog", true);
    }
    // async save() {
    //   const saveResults = await this.model.save(
    //     `localstorage://${this.storageID}`
    //   );
    //   this.trainingStatus = `Trained (saved ${saveResults.modelArtifactsInfo.dateSaved})`;
    // },
    // async load() {
    //   this.disableLoadData = true;
    //   const storageKey = `localstorage://${this.storageID}`;
    //   const models = await tf.io.listModels();
    //   const modelInfo = models[storageKey];
    //   if (modelInfo) {
    //     this.model = await tf.loadLayersModel(storageKey);

    //     tfvis.show.modelSummary({ name: "Model summary" }, this.model);
    //     const layer = this.model.getLayer(undefined, 0);
    //     tfvis.show.layer({ name: "Layer 1" }, layer);

    //     await this.plotPredictionLine();

    //     this.trainingStatus = `Trained (saved ${modelInfo.dateSaved})`;
    //     this.disablePredict = false;
    //   } else {
    //     alert("Could not load: no saved model found");
    //   }
    // },

    // async plotParams(weight, bias) {
    //   this.model.getLayer(null, 0).setWeights([
    //     tf.tensor2d([[weight]]), // Kernel (input multiplier)
    //     tf.tensor1d([bias]) // Bias
    //   ]);
    //   await this.plotPredictionLine();
    //   const layer = this.model.getLayer(undefined, 0);
    //   tfvis.show.layer({ name: "Layer 1" }, layer);
    // },
  }
};
</script>
