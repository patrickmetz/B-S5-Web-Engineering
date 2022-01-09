<?php

require_once "./Loggable.php";
require_once "./FormHelper.php";

class JsonContent{

}

class Content extends Loggable
{
    private $_jsonFilePath;

    private $_topic;
    private $_subtopic;
    private $_reference;
    private $_content;
    private $_minLength = 3;

    public function __construct($jsonFilePath, $topic, $subtopic, $reference, $content)
    {
        $this->_jsonFilePath = $jsonFilePath;
        $this->_topic = $topic;
        $this->_subtopic = $subtopic;
        $this->_reference = $reference;
        $this->_content = $content;
    }

    public function write(){
        if (
            $this->_isInputOk("Thema", $this->_topic, $this->_minLength)
            &&
            $this->_isInputOk("Unterthema", $this->_subtopic, $this->_minLength)
            &&
            $this->_isInputOk("Quelle", $this->_reference, $this->_minLength)
            &&
            $this->_isInputOk("Inhalt", $this->_content, $this->_minLength)
        ) {
            $this->_write();
        }
    }

    private function _write()
    {
    }

    protected function _isInputOk($name, $value, $minLength)
    {
        if (FormHelper::isTooShort($value, $minLength)) {
            $this->logError(
                $name . " muss mindestens $minLength Zeichen lang sein.\n"
            );
            return false;
        }

        return true;
    }
}