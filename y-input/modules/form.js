
export function setFormValue(internal, formdata, name, points) {
    formdata.delete(name);
    points.forEach((point) => formdata.append(name, point.y));
    internal.setFormValue(formdata);
    return formdata;
}
