export type NavigateCallback = (params?: any) => any
export type NavigateParams = {
  referrer?: string
  callback?: NavigateCallback
  screen?: string
  params?: any
}

export type RootStackParamList = {
  Home: NavigateParams
  ScrollView: NavigateParams
  DraggableFlatlist: NavigateParams
  LanscapeView: NavigateParams
  OnceLogin: NavigateParams
  TextInputEx: NavigateParams
  CalendarManager: NavigateParams
  ToastModule: NavigateParams
  SwiperView: NavigateParams
  PDFComponent: NavigateParams
  EchartsCom: NavigateParams
  DatePickerCom: NavigateParams
  SnapCarousel: NavigateParams
  ShadowView: NavigateParams
  GestureView: NavigateParams
  Trtc: NavigateParams
  // IMViewContainer: NavigateParams
  IMView: NavigateParams
  SafetyKeyboard: NavigateParams
  BdAsr: NavigateParams
  RenderHtml: NavigateParams
}

export type IMStackParamList = {
  // IMView: NavigateParams
  IMHomeScreen: NavigateParams
  IMUserScreen: NavigateParams
  IMDetailsScreen: NavigateParams
}
