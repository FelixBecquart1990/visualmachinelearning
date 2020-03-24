<template>
  <div class="home">
    <v-stepper v-model="step" vertical class="elevation-0">
      <v-stepper-step :complete="step > 1" step="1">
        Load data
        <small>Summarize if needed</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-12 pa-4" height="200px">
          <v-btn
            @click="loadData()"
            :disabled="disableLoadData"
            :loading="loadingData"
            >Load Data</v-btn
          >
        </v-card>
        <v-btn color="primary" @click="step = 2">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2"
        >Create a model</v-stepper-step
      >
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-12 pa-4" height="200px">
          <v-btn @click="createModel()" :disabled="disableCreateModel"
            >Create a model</v-btn
          ></v-card
        >
        <v-btn color="primary" @click="step = 3">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 3" step="3"
        >Train the model</v-stepper-step
      >
      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-12 pa-4" height="200px"
          ><v-btn
            @click="train()"
            :disabled="disableTrain"
            :loading="loadingTrain"
            >Train model</v-btn
          >
          <div>{{ trainingStatus || "Loading data..." }}</div>
        </v-card>
        <v-btn color="primary" @click="step = 4">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 4" step="4"
        >Test the model</v-stepper-step
      >
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-12 pa-4" height="200px"
          ><v-btn @click="test()" :disabled="disableTest" :loading="loadingTest"
            >Test model</v-btn
          >
          <div>{{ testingStatus || "Not yet tested" }}</div>
        </v-card>
        <v-btn color="primary" @click="step = 5">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 5" step="5">Predict</v-stepper-step>
      <v-stepper-content step="5">
        <v-card color="grey lighten-1" class="mb-12 pa-4" height="200px">
          <v-text-field
            type="number"
            label="Solo"
            placeholder="Prediction input"
            solo
            v-model="predictionInput"
          ></v-text-field>
          <v-btn @click="predict()">Predict</v-btn>
          <div>{{ predictionOutput || "" }}</div>
        </v-card>
        <v-btn color="primary" @click="step = 1">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
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
      disableLoadData: false,
      loadingData: false,
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
      tf.util.shuffle(this.points);
      this.plot(this.points, "Square feet");

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
      this.trainingStatus = "No model trained";
      this.disableTrain = false;
      this.disableLoadModel = false;
      this.loadingData = false;
      this.disableLoadData = true;
      this.$store.commit("setSnackbar", {
        color: "success",
        timeout: 3000,
        text: "Data successfully loaded"
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
      this.$store.commit("setSnackbar", {
        color: "success",
        timeout: 3000,
        text: "Model created"
      });
    },
    async train() {
      this.trainingStatus = "Training...";

      this.loadingTrain = true;
      await this.plotPredictionLine();

      const result = await this.trainModel();
      const trainingLoss = result.history.loss.pop();
      const validationLoss = result.history.val_loss.pop();

      this.trainingStatus =
        "Trained (unsaved)\n" +
        `Loss: ${trainingLoss.toPrecision(5)}\n` +
        `Validation loss: ${validationLoss.toPrecision(5)}`;
      // this.disableSave = false;
      this.disablePredict = false;
      this.disableTrain = true;
      this.loadingTrain = false;
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
              await self.plotPredictionLine();
              const layer = self.model.getLayer(undefined, 0);
              tfvis.show.layer({ name: "Layer 1" }, layer);
            }
          }
        }
      );
    },
    async test() {
      this.disableTest = true;
      this.loadingTest = true;
      const lossTensor = this.model.evaluate(
        this.testingFeatureTensor,
        this.testingLabelTensor
      );
      const loss = (await lossTensor.dataSync())[0];
      this.testingStatus = `Testing set loss: ${loss.toPrecision(5)}`;
      this.loadingTest = false;
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
