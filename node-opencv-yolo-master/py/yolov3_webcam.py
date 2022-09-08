# https://pylessons.com/YOLOv3-WebCam

yolo = YOLO()

# we create the video capture object cap
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise IOError("We cannot open webcam")

while True:
    ret, frame = cap.read()
    # resize our captured frame if we need
    frame = cv2.resize(frame, None, fx=1.0, fy=1.0,
                       interpolation=cv2.INTER_AREA)

    # detect object on our frame
    r_image, ObjectsList = yolo.detect_img(frame)

    # show us frame with detection
    cv2.imshow("Web cam input", r_image)
    if cv2.waitKey(25) & 0xFF == ord("q"):
        cv2.destroyAllWindows()
        break

cap.release()
cv2.destroyAllWindows()
yolo.close_session()
