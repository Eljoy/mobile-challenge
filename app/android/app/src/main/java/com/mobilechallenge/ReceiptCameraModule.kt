package com.mobilechallenge

import android.app.Activity
import android.app.Activity.RESULT_OK
import android.content.Intent
import com.facebook.react.bridge.*

class ReceiptCameraModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private var promise: Promise? = null

  companion object {
    private const val REQUEST_CODE = 12
  }

  private val activityEventListener = object : BaseActivityEventListener() {
    override fun onActivityResult(
      activity: Activity?,
      requestCode: Int,
      resultCode: Int,
      intent: Intent?
    ) {
      if (requestCode == REQUEST_CODE) {
        if (resultCode == RESULT_OK) {
          val extras = intent!!.extras
          val map = WritableNativeMap()
          map.putString("fileName", extras!!.getString("fileName"))
          map.putString("uri", extras.getString("uri"))
          promise?.resolve(map)
        } else {
          val map = WritableNativeMap()
          map.putString("fileName", null)
          map.putString("uri", null)
          promise?.resolve(map)
        }
      }
    }
  }

  init {
    reactApplicationContext.addActivityEventListener(activityEventListener)
  }

  @ReactMethod
  fun makePhoto(expenseJSON: String, promise: Promise) {
    this.promise = promise
    val intent = Intent(reactApplicationContext, ReceiptCameraActivity::class.java)
    intent.putExtra("expenseJSON", expenseJSON)
    currentActivity?.startActivityForResult(intent, REQUEST_CODE, null)
  }

  override fun getName() = "ReceiptCamera"
}


