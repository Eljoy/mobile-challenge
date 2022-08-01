package com.mobilechallenge

import android.net.Uri
import android.util.Log
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview
import androidx.camera.view.PreviewView
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.viewinterop.AndroidView
import com.mobilechallenge.extensions.getCameraProvider
import java.io.File
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.Executor

@Composable
fun CameraView(
  outputDirectory: File,
  executor: Executor,
  onImageCaptured: (uri: Uri, fileName: String) -> Unit,
  onError: (ImageCaptureException) -> Unit,
  content: @Composable (takePhoto: () -> Unit) -> Unit
) {
  val lensFacing = CameraSelector.LENS_FACING_BACK
  val context = LocalContext.current
  val lifecycleOwner = LocalLifecycleOwner.current

  val preview = Preview.Builder().build()
  val previewView = remember { PreviewView(context) }
  val imageCapture: ImageCapture = remember { ImageCapture.Builder().build() }
  val cameraSelector = CameraSelector.Builder()
    .requireLensFacing(lensFacing)
    .build()

  LaunchedEffect(lensFacing) {
    val cameraProvider = context.getCameraProvider()
    cameraProvider.unbindAll()
    cameraProvider.bindToLifecycle(
      lifecycleOwner,
      cameraSelector,
      preview,
      imageCapture
    )

    preview.setSurfaceProvider(previewView.surfaceProvider)
  }

  Box(contentAlignment = Alignment.BottomCenter, modifier = Modifier.fillMaxSize()) {
    AndroidView({ previewView }, modifier = Modifier.fillMaxSize())

    content {
      takePhoto(
        filenameFormat = "yyyy-MM-dd-HH-mm-ss-SSS",
        imageCapture = imageCapture,
        outputDirectory = outputDirectory,
        executor = executor,
        onImageCaptured = onImageCaptured,
        onError = onError
      )
    }
  }
}

private fun takePhoto(
  filenameFormat: String,
  imageCapture: ImageCapture,
  outputDirectory: File,
  executor: Executor,
  onImageCaptured: (uri: Uri, fileName: String) -> Unit,
  onError: (ImageCaptureException) -> Unit
) {

  val photoFile = File(
    outputDirectory,
    SimpleDateFormat(filenameFormat, Locale.US).format(System.currentTimeMillis()) + ".jpg"
  )

  val outputOptions = ImageCapture.OutputFileOptions.Builder(photoFile).build()

  imageCapture.takePicture(outputOptions, executor, object : ImageCapture.OnImageSavedCallback {
    override fun onError(exception: ImageCaptureException) {
      Log.e("TakePhoto", "Take photo error:", exception)
      onError(exception)
    }

    override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
      val savedUri = Uri.fromFile(photoFile)
      onImageCaptured(savedUri, photoFile.name)
    }
  })
}