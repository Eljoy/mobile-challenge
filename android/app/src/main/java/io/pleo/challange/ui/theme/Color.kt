package io.pleo.challange.ui.theme

import androidx.compose.ui.graphics.Color

val yellow400 = Color(0xfffbefaf)
val pink300 = Color(0xffffdee2)
val green500 = Color(0xfface3bd)
val purple500 = Color(0xffa69ae3)
val shade000 = Color(0xffffffff)
val shade400 = Color(0xfff2f2f2)
val shade900 = Color(0xff000000)


val primaryColors = arrayListOf(
    yellow400, pink300, green500, purple500
)


fun String.color(): Color {
    val colorIndex = first().code % primaryColors.size
    return primaryColors[colorIndex]
}
