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
}
