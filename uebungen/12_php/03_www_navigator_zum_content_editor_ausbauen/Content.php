<?php

require_once "./Loggable.php";
require_once "./FormHelper.php";

class JsonContent
{

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
        $this->_topic = htmlspecialchars($topic);
        $this->_subtopic = htmlspecialchars($subtopic);
        $this->_reference = htmlspecialchars($reference);
        $this->_content = htmlspecialchars($content);
    }

    public function write()
    {
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
        $json = json_decode($this->_readFile());

        if ($this->_existsContent($json)) {
            $this->logError("Unterthema '$this->_subtopic' existiert bereits in Thema '$this->_topic'");
        } else {
            $this->_addContentToJson($json);

            $json = $this->_jsonObjectArrayToString($json);

            $this->_writeFile($json);
        }
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

    private function _addContentToJson(&$jsonArray)
    {
        // source: https://stackoverflow.com/a/12138925
        $content = new stdClass();

        $content->topic = $this->_topic;
        $content->subtopic = $this->_subtopic;
        $content->reference = $this->_reference;
        $content->topic = $this->_topic;
        $content->content = $this->_content;

        $jsonArray[] = $content;
    }

    private function _readFile()
    {
        $fileContent = null;
        $file = fopen($this->_jsonFilePath, "r");

        // LOCK_SH = "reader lock" for efficient multiple concurrent reading of file which may be locked
        if (flock($file, LOCK_SH)) {
            $fileContent = fread($file, pow(2, 16)); // read up to 2 gigabyte
            flock($file, LOCK_UN);
        } else {
            $this->logError("Daten konnten nicht geladen werden.");
        }
        fclose($file);

        return $fileContent;
    }

    private function _writeFile($string)
    {
        if (file_put_contents($this->_jsonFilePath, $string, LOCK_EX)) {
            $this->logSuccess("Daten wurden gespeichert.");
        } else {
            $this->logError("Daten konnten nicht gespeichert werden.");
        }
    }

    private function _existsContent($arrayOfObjects)
    {
        foreach ($arrayOfObjects as $object) {
            if (
                ($object->topic === $this->_topic)
                && ($object->subtopic === $this->_subtopic)
            ) {
                return true;
            }
        }

        return false;
    }

    private function _jsonObjectArrayToString($json)
    {
        $json = array_map("json_encode", $json);

        return "[" . PHP_EOL
            . implode("," . PHP_EOL, $json)
            . PHP_EOL . "]";
    }
}